import Layout from "@/components/layout";
import Link from "next/link";

import AddToHomescreenButton from "@/components/home/addToHomescreenButton";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  return (
    <Layout>
      <motion.div
        className="flex w-full flex-row "
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          className="flex w-full flex-col items-center justify-center py-32"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="w-full py-10 px-5 md:w-1/2 md:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-rblue-500">Login</h1>
              <p>Enter your information to login</p>
            </div>
            <form action={`${API_URL}/register`} method="post">

              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Email</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <Mail className="w-1/2 text-lg text-gray-400"></Mail>
                    </div>
                    <input
                      type="email"
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="oliver.kahn@example.com"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-12 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Password</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <Lock className="w-1/2 text-lg text-gray-400"></Lock>
                    </div>
                    <input
                      type="password"
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <button className="mx-auto block w-full max-w-xs rounded-lg bg-rblue-500 px-3 py-3 font-semibold text-white hover:bg-rblue-600 active:bg-rblue-700">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <motion.div
              className="mx-auto flex flex-col items-center justify-center"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Balancer>
                You don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-rblue-500 transition duration-300 ease-out hover:text-rblue-300 hover:underline"
                >
                  Sign up
                </Link>
              </Balancer>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="bg-hero box-border hidden w-1/2 bg-[url('/assets/trainer.jpg')] bg-cover bg-center bg-no-repeat py-10 px-10 md:block"
        ></motion.div>
      </motion.div>
    </Layout>
  );
}