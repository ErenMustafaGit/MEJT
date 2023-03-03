import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function DisplayLongText({
  text,
  title,
}: {
  text: string;
  title: string;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="px-1 text-xs font-semibold">{title}</p>
      <div className="w-full rounded-lg border border-gray-500/30 p-2">
        <Balancer className="text-gray-500">{text}</Balancer>
      </div>
    </div>
  );
}
