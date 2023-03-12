import Image from "next/image";
import { colors, invertedColors } from "@/lib/constants";

export default function FeedbackAttribut({
  inverted,
  value,
  title,
  icon,
}: {
  inverted:boolean;
  value: number;
  title: string;
  icon: string;
}) {

  return (
    <div className="flex w-24 flex-col items-center justify-center rounded-lg border-2 border-rblue-700/20 p-4 sm:w-52 sm:px-8">
      <Image width={300} height={300} src={icon} alt={title}></Image>
      <h3 className="font-bold uppercase text-gray-700 sm:text-xl">{title}</h3>
      <p className={`font-bold uppercase sm:text-4xl ${(inverted) ? invertedColors[value]: colors[value]}`}>
        {value}/10
      </p>
    </div>
  );
}
