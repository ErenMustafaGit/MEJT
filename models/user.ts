import { DefaultUser, DefaultSession } from "next-auth";

export interface User extends DefaultUser {
  type: string | number;
  token: string;
}

export interface Session extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    type?: string | number;
    token?: string;
  };
}
