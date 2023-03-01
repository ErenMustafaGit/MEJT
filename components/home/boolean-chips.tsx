import { ReactNode } from "react";

export default function BooleanChips({
  value,
  trueString = "True",
  falseString = "False",
}: {
  value: any;
  trueString?: string;
  falseString?: string;
}) {
  const className =
    "flex items-center justify-center px-4 py-1 text-sm rounded-full";
  return (
    <>
      {value ? (
        <div className={`${className} bg-green-400/50 text-green-600/80`}>
          {trueString}
        </div>
      ) : (
        <div className={`${className} bg-red-400/50 text-red-600/80`}>
          {falseString}
        </div>
      )}
    </>
  );
}
