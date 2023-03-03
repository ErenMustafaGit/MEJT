import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function FeedbackAttribut({
  value,
  title,
  icon,
}: {
  value: number;
  title: string;
  icon: string;
}) {
  // Gradient of 10 colors from red to green, passing by orange and yellow
  const colors = [
    "text-red-700",
    "text-red-600/80",
    "text-orange-500",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400/70",
    "text-green-400",
    "text-green-600/80",
    "text-green-600",
    "text-green-700",
  ];
  return (
    <div className="flex w-24 flex-col items-center justify-center rounded-lg border-2 border-rblue-800/50 p-4 sm:w-52 sm:px-8">
      <Image width={300} height={300} src={icon} alt={title}></Image>
      <h3 className="font-bold uppercase text-gray-700 sm:text-xl">{title}</h3>
      <p className={`font-bold uppercase sm:text-4xl ${colors[value - 1]}`}>
        {value}/10
      </p>
    </div>
  );
}
