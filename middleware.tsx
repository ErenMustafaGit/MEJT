// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./lib/auth";
import { User } from "models/user";
import { ATHLETE, TRAINER } from "./lib/constants";

const authPrefix = ["/dashboard", "/trainer", "/admin", "/user", "/athlete"];
const noauthPrefix = ["/login", "/register", "/role-choice"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
  if (authPrefix.some((prefix) => pathname.startsWith(prefix))) {
    const session =
      req.cookies.get("session")?.value || req.cookies.get("session");
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      // On verifie le type de l'utilisateur et on redirige vers la bonne page
      const user: User | null = getUser(req.cookies.get("session")?.value);
      if (user?.type === TRAINER && pathname.startsWith("/athlete")) {
        return NextResponse.redirect(new URL("/trainer/dashboard", req.url));
      } else if (user?.type === ATHLETE && pathname.startsWith("/trainer")) {
        return NextResponse.redirect(new URL("/athlete/dashboard", req.url));
      }
    }
  }

  if (noauthPrefix.some((prefix) => pathname.startsWith(prefix))) {
    const session = req.cookies.get("session")?.value;
    if (session) {
      // On verifie le type de l'utilisateur et on redirige vers la bonne page
      const user: User | null = getUser(req.cookies.get("session")?.value);
      if (user?.type === TRAINER) {
        return NextResponse.redirect(new URL("/trainer/dashboard", req.url));
      } else if (user?.type === ATHLETE) {
        console.log("redirecting to trainer dashboard");
        return NextResponse.redirect(new URL("/athlete/dashboard", req.url));
      }
    }
  }
  return NextResponse.next();
}
