import Card from "@/components/home/card";
import Layout from "@/components/layout";
import AddToHomescreenButton from "@/components/home/addToHomescreenButton";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
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
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
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
            management platform, where coaches and athletes can track, schedule,
            and analyze their progress to achieve their goals.
          </Balancer>
        </motion.h2>

        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Get Started</p>
          </a>
          <AddToHomescreenButton />
        </motion.div>
      </motion.div>
    </Layout>
  );
}
