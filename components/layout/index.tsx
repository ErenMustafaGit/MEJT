import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

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
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
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
              {!session && status !== "loading" ? (
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
                    href="/register"
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <UserDropdown />
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
