import Balancer from "react-wrap-balancer";
import Link from "next/link";

export default function SessionCard({
  id,
  date,
  place,
  description,
  name,
}: {
  id: number;
  date: string;
  place: string;
  description: string;
  name: string;
}) {
  return (
    <div
      className={`w-full rounded-xl border border-rblue-200 bg-white shadow-md sm:w-96`}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <h2 className="bg-gradient-to-br from-rblue-700 to-rblue-500 bg-clip-text font-display text-xl font-bold capitalize text-transparent">
          <Balancer>{name}</Balancer>
        </h2>
        <div className="mt-4 flex flex-col justify-between gap-2 text-gray-500 md:flex-row">
          <Balancer>{date}</Balancer>
          <Link
            className="rounded-full border border-rblue-500 bg-rblue-500 p-1 px-2 text-center text-sm text-white transition-all hover:border-rblue-600 hover:bg-rblue-600"
            href={`/athlete/feedback/${id}`}
          >
            Give a feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
