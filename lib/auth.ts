import { getCookie, hasCookie } from "cookies-next";
import { User } from "models/user";

export const getUser = (cookies?: any): User | null => {
  if (hasCookie("session") && !cookies) {
    const cookie: string = getCookie("session")!.toString();
    const user: User = JSON.parse(cookie);
    return user;
  } else if (cookies) {
    const cookie: string = cookies;
    const user: User = JSON.parse(cookie);
    return user;
  }
  return null;
};
