import { useState, useEffect } from "react";
import { CallAddToHomescreenPrompt } from "@/lib/callAddToHomescreenPrompt";

export default function AddToHomescreenButton() {
  const [prompt, promptToInstall] = CallAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = useState(true);

  const hide = () => setVisibleState(false);

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  if (!isVisible) {
    return <div />;
  }

  return (
    <div className="group flex max-w-fit cursor-pointer items-center justify-center space-x-2 rounded-full border-2 border-black px-5 py-2 text-sm transition-colors hover:bg-black hover:text-white">
      <button onClick={promptToInstall}>Download App</button>
    </div>
  );
}
