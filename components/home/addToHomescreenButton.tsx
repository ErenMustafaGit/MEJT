import { useState, useEffect } from "react";
import { CallAddToHomescreenPrompt } from "@/lib/callAddToHomescreenPrompt";
import { getParser } from "bowser";

export default function AddToHomescreenButton() {
  const [prompt, promptToInstall] = CallAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = useState(true);

  const INCOMPATIBLE_BROWSERS = ["Mozilla", "Firefox"];

  const browserIsSupported = (useragent: any) => {
    const browser = getParser(useragent);
    const currentBrowser = browser.getBrowserName();
    let isSupported = true;
    INCOMPATIBLE_BROWSERS.forEach((incompatible_browser) => {
      if (currentBrowser === incompatible_browser) {
        isSupported = false;
      }
    });
    return isSupported;
  };

  const hide = () => setVisibleState(false);

  useEffect(() => {
    // Hide the button if the browser is not supported
    // Or if the user is in PWA
    if (
      typeof window !== "undefined" &&
      !browserIsSupported(navigator.userAgent)
    ) {
      hide();
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      hide();
    }
  }, []);

  useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  if (!isVisible) {
    return <div />;
  }

  return (
    <div className="group flex max-w-fit cursor-pointer items-center justify-center space-x-2 rounded-full border-2 border-rblue-500 px-5 py-2 text-sm text-rblue-600 transition-colors hover:bg-rblue-500 hover:text-white">
      <button onClick={promptToInstall}>Download App</button>
    </div>
  );
}
