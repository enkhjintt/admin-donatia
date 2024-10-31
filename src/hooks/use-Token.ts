import dayjs from "dayjs";
import { getSession } from "next-auth/react";

let currentToken: string | null = null;

export async function iToken(): Promise<string | null> {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("Session not found.");
    }

    const token = session.token;
    const expireDate = dayjs(session.expires);
    const currentDate = dayjs();

    if (expireDate.isBefore(currentDate)) {
      // Token has expired, set token to null
      currentToken = null;
    } else {
      // Token is still valid, update currentToken
      currentToken = token;
      // console.log(' currentToken', currentToken);
    }

    return currentToken;
  } catch (error) {

    return null;
  }
}
