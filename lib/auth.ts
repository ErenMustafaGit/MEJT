import { getCookie, hasCookie } from "cookies-next";
import { User } from "models/user";

export const getUser = (cookies?: any): User | null => {
  if (hasCookie("session") && !cookies) {
    const cookie: string = getCookie("session")!.toString();
    const user: User = JSON.parse(cookie)?.user;
    console.log(user);
    return user;
  } else if (cookies) {
    const cookie: string = cookies;
    const user: User = JSON.parse(cookie)?.user;
    return user;
  }
  return null;
};

export const getToken = (cookies?: any): string | null => {
  if (hasCookie("session") && !cookies) {
    const cookie: string = getCookie("session")!.toString();
    const user: string = JSON.parse(cookie)?.token;
    console.log(user);
    return user;
  } else if (cookies) {
    const cookie: string = cookies;
    const user: string = JSON.parse(cookie)?.token;
    return user;
  }
  return null;
};
