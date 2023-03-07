import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({
  path,
  text = "Go back",
}: {
  path: string;
  text?: string;
}) {
  const URL = process.env.NEXT_PUBLIC_MEJT_URL
    ? process.env.NEXT_PUBLIC_MEJT_URL
    : "https://mejt.erenc.fr";

  return (
    <motion.div
      className="flex items-center text-rblue-500 transition-all delay-150 duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:font-bold hover:text-rblue-400 hover:underline hover:decoration-2"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <ArrowLeft />
      <p className="text-lg font-bold">
        <Link href={URL + path}>{text}</Link>
      </p>
    </motion.div>
  );
}
