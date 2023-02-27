import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Image from "next/image";
import useLocalStorage from "@/lib/hooks/use-local-storage";

export default function RoleChoice() {
  const [role, setRole] = useLocalStorage("role", 0);
  const router = useRouter();
  return (
    <Layout>
      <div className="flex w-full flex-col items-center justify-center py-32">
        <motion.div
          className="max-w-4xl px-5 xl:px-0"
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
          <motion.h1
            className="bg-gradient-to-br from-rblue-800 to-rblue-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-6xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>What is your role ?</Balancer>
          </motion.h1>
          <motion.div
            className="mx-auto mt-6 flex flex-col items-center justify-center gap-12  sm:flex-row sm:gap-12"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <button
              onClick={() => {
                // Trainer
                setRole(1);
                router.push("/register");
              }}
              className="flex h-1/2 w-1/2 transform flex-col overflow-hidden rounded-lg bg-slate-100 bg-opacity-80 drop-shadow-xl transition duration-300 ease-out hover:scale-105 hover:drop-shadow-2xl sm:h-full sm:w-full sm:max-w-xs"
            >
              <Image
                className="w-full rounded-t-lg bg-gray-500 drop-shadow-xl"
                src={`/assets/trainer2-medium.jpg`}
                alt={"Trainer"}
                width={500}
                height={300}
              />
              <h2 className="m-4 text-xl font-semibold">Trainer</h2>

              <p className="m-4 mt-2 text-left">
                Create your squad, track the activity of your athletes..
              </p>
            </button>
            <button
              onClick={() => {
                // Athlete
                setRole(0);
                router.push("/register");
              }}
              className="flex h-1/2 w-1/2 transform flex-col overflow-hidden rounded-lg bg-slate-100 bg-opacity-80 drop-shadow-xl transition duration-300 ease-out hover:scale-105 hover:drop-shadow-2xl sm:h-full sm:w-full sm:max-w-xs"
            >
              <Image
                className="w-full rounded-t-lg bg-gray-500 drop-shadow-xl"
                src={`/assets/athlete.jpg`}
                alt={"Trainer"}
                width={500}
                height={300}
              />
              <h2 className="m-4 text-xl font-semibold ">Athletes</h2>

              <p className="m-4 mt-2 text-left">
                Track your activity and injuries, give your feedback to your
                trainer..
              </p>
            </button>
          </motion.div>
          <motion.div
            className="mx-auto mt-12 flex flex-col items-center justify-center gap-12 sm:flex-row sm:gap-12"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-rblue-500 transition duration-300 ease-out hover:text-rblue-300 hover:underline"
              >
                Log in
              </Link>
            </Balancer>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
