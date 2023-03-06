import { ATHLETE, FADE_IN_ANIMATION_SETTINGS, TRAINER } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import Meta from "./meta";
import UserDropdown from "./user-dropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { getUser } from "@/lib/auth";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const session = getUser();
  const { email, image, type } = session || {};
  const router = useRouter();

  return (
    <>
      <Meta {...meta} />
      <ToastContainer />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 z-30 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="MEJT logo"
              width="90"
              height="60"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
          <div>
            <AnimatePresence>
              {!session ? (
                <div className="flex gap-4">
                  <Link
                    className="rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600"
                    href="/login"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600"
                    href="/role-choice"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      if (type === ATHLETE) router.push("/athlete/dashboard");
                      else if (type === TRAINER)
                        router.push("/trainer/dashboard");
                    }}
                    className="hidden text-sm text-rblue-500 transition-all duration-300 ease-out hover:text-rblue-300 hover:underline sm:block"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Dashboard
                  </button>
                  <UserDropdown />
                  <button
                    onClick={() => {
                      // Remove cookie with key "session"
                      deleteCookie("session");
                      router.push("/login");
                    }}
                    className="rounded-full border-2 border-rblue-500 bg-rblue-500 p-1.5 px-4 text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* flex w-full flex-col items-center justify-center py-32 */}
      <main className="">{children}</main>
      {/* <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white py-2 text-center">
        <p className="text-sm text-gray-500">
          MEJT - {new Date().getFullYear()}
        </p>
      </div> */}
    </>
  );
}
