import CredentialsProvider from 'next-auth/providers/credentials';
import { type AuthOptions } from 'next-auth';
import { loginRequest, LoginResponse } from '@/api/auth';

const AuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'CredentialProvider',
      name: 'CredentialProvider',
      type: 'credentials',
      credentials: {
        identifier: { label: 'identifier', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        console.log("credential",credentials);

        const response = await loginRequest({
          identifier: credentials.identifier,
          password: credentials.password,
        });

        if (!response.success) {
          throw new Error(response.error.message);
        }

        return {
          token: response.data.token,
          permission: response.data.permission,
        } as any;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          token: (user as unknown as LoginResponse).token,
          level: (user as unknown as LoginResponse).level,
          permission: (user as unknown as LoginResponse).permission,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.token = token.token as string;
        session.level = token.level as string;
        session.permission = token.permission as string[];
      }

      return session;
    },
  },

  pages: {
    error: '',
    signIn: '/auth/login',
    signOut: '/auth/login',
    newUser: '/auth/login',
    verifyRequest: '/auth/login',
  },

  events: {
    async signOut() {},
  },

  debug: process.env.NODE_ENV !== 'production',
};

export default AuthOptions;
