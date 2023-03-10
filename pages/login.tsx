import Layout from "@/components/layout";
import Link from "next/link";

import Balancer from "react-wrap-balancer";
import Axios from "axios";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS, TRAINER } from "@/lib/constants";
import { useRouter } from "next/router";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { setCookie } from "cookies-next";
import ActionButton from "@/components/home/action-button";
import { displayToaster } from "@/lib/utils";

export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_MEJT_API_URL;
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      if (res.data.success) {
        const session = {
          token: res.data.token,
          user: res.data.user,
        };
        setCookie("session", session, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        res.data.user.type === TRAINER
          ? router.push("/trainer/dashboard")
          : router.push("/athlete/dashboard");
      } else {
        setLoading(false);
        displayToaster("error", res.data.error);
      }
    } catch (error) {
      setLoading(false);
      displayToaster("error", "Error while logging in");
      if (Axios.isAxiosError(error)) {
        console.error(error);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <motion.div
        className="flex w-full flex-row overflow-hidden"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          className="flex w-full flex-col items-center justify-center pt-32"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="w-full px-5 md:w-1/2 md:py-10 md:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-rblue-500">Login</h1>
              <p className="py-1">Enter your information to login</p>
            </div>
            <form onSubmit={submitLogin}>
              <div className="-mx-3 flex">
                <div className="mb-5 w-full px-3">
                  <label className="px-1 text-xs font-semibold">Email</label>
                  <div className="flex">
                    <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                      <Mail className="w-1/2 text-lg text-gray-400"></Mail>
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-rblue-500"
                      placeholder="************"
                    />
                  </div>
                </div>
              </div>
              <div className="-mx-3 flex">
                <div className="mb-5 flex w-full justify-center px-3">
                  <ActionButton
                    className="w-full"
                    disabled={loading}
                    onClick={() => router.push("/trainer/create-session")}
                  >
                    Login
                  </ActionButton>
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
                  className={`text-rblue-500 transition duration-300 ease-out hover:text-rblue-300 hover:underline `}
                >
                  Signup
                </Link>
              </Balancer>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-hero box-border hidden h-screen w-1/2 bg-[url('/assets/trainer.jpg')] bg-cover bg-center bg-no-repeat py-10 px-10 md:block"
        ></motion.div>
      </motion.div>
    </Layout>
  );
}
