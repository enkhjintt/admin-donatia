import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

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

export default function useSessionPermission() {
  const [permissions, setPermissions] = useState<any>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const session = await getSession();
      const token = session?.token;
      if (token) {
        const decodedToken = jwt.decode(token) as DecodedToken;
        const roles = decodedToken?.roles;
        setPermissions(roles);
      } else {
        setPermissions([]);
      }
    };

    fetchPermissions();
  }, []);

  return permissions;
}
