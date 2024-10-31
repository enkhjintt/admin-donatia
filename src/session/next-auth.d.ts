import NextAuth from 'next-auth';

declare module 'next-auth' {
 
  interface User {
    id: number;
    exp: number;
    system_code: string;
    org_id: number;
  
    user_phone: number;
    user_email: string;
    roles: string[];
    level: number;
  }
  
  export interface Session {
    token: string;
    permission: string[];
    user: User;
    level: string;
}
}