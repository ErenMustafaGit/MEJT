import Link from "next/link";
import Layout from "@/components/layout";
import AddToHomescreenButton from "@/components/home/addToHomescreenButton";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  const imageClassName =
    "h-2/3 w-2/3 transform rounded-lg object-cover object-center shadow-lg transition-all duration-250 ease-in-out hover:scale-105 hover:shadow-xl sm:h-1/2 sm:w-1/2";

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
            className="bg-gradient-to-br from-rblue-800 to-rblue-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>Track your activity</Balancer>
          </motion.h1>
          <motion.h2
            className="mt-6 text-center text-gray-400"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>
              Maximize your athletic potential with our all-in-one training
              management platform, where coaches and athletes can track,
              schedule, and analyze their progress to achieve their goals.
            </Balancer>
          </motion.h2>

          <motion.div
            className="mx-auto mt-6 flex items-center justify-center space-x-5"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Link
              className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-rblue-500 bg-gradient-to-br from-rblue-700 to-rblue-500 px-5 py-2 text-sm text-white transition-all duration-500 ease-in-out hover:bg-gradient-to-bl"
              href="/role-choice"
              rel="noopener noreferrer"
            >
              <p>Get Started</p>
            </Link>
            <AddToHomescreenButton />
          </motion.div>

          <motion.div
            className="mx-auto mt-24 flex flex-col items-center space-x-4 space-y-4 sm:flex-row sm:space-x-12"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Image
              className={imageClassName}
              width={3481}
              height={2321}
              src="/assets/athlete.jpg"
              alt="Athlete shoes"
            />
            <div className="rounded-lg bg-white object-cover object-center p-4 shadow-xl shadow-rblue-500/10">
              <h3 className="text-2xl font-bold">For Athletes</h3>
              <p className="mt-2 text-gray-400">
                Track your progress, set goals, and analyze your performance
                with our all-in-one training management platform.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto mt-24 flex flex-col items-center space-x-4 space-y-4 sm:flex-row sm:space-x-12"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <div className="rounded-lg bg-white object-cover object-center p-4 shadow-xl shadow-rblue-500/10">
              <h3 className="text-2xl font-bold">For Trainer</h3>
              <p className="mt-2 text-gray-400">
                Track your athletes progress, set goals, and analyze their
                performance with our all-in-one training management platform.
              </p>
            </div>
            <Image
              className={imageClassName}
              width={3481}
              height={2321}
              src="/assets/trainer.jpg"
              alt="Trainer helping athlete"
            />
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
