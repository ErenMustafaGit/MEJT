import NextAuth, { DefaultUser, NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User, Session as MySession } from "models/user";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "token", type: "hidden" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const request = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MEJT_API_URL}/login`,
            request,
          );
          // const user = response.data.user;
          const res = response?.data;
          const token = res?.token;
          const user = res?.user;
          if (token && user) {
            return {
              id: res.token,
              email: user.email,
              name: user.name,
              type: user.type,
              token: token,
            };
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<any> {
      if (account && user) {
        return {
          ...token,
          accessToken: token,
          user: token.user,
          // refreshToken: refreshToken,
        };
      }

      return token;
    },

    async session({ session, token }): Promise<MySession> {
      return session;
    },
  },
};

export default NextAuth(authOptions);
