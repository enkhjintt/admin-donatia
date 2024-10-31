'use client';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  exp: number;
  system_code: string;
  org_id: number;
  user_id: number;
  user_phone: string;
  user_email: string;
  roles: string[];
  level: number;
}

export default function useSessionForUser() {
  const [orgID, setOrgID] = useState<number | null>(null);
  const [userID, setUserID] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrgID = async () => {
      const session = await getSession();
      const token = session?.token;

      if (token) {
        const decodedToken = jwt.decode(token) as DecodedToken;
        const orgID = decodedToken.org_id;
        const userID = decodedToken.user_id;

        setOrgID(orgID);
        setUserID(userID);
      } else {
        setOrgID(0);
        setUserID(0);
      }
    };

    fetchOrgID();
  }, []);
  return { orgID, userID };
}
