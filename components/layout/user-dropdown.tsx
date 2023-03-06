import { useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { motion } from "framer-motion";
import { ATHLETE, FADE_IN_ANIMATION_SETTINGS, TRAINER } from "@/lib/constants";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

export default function UserDropdown() {
  const router = useRouter();

  const session = getUser();
  const { email, image, type } = session || {};
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <motion.div
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56">
            {/* <Link
              className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              href="/dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </Link> */}
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                if (type === ATHLETE) router.push("/athlete/dashboard");
                else if (type === TRAINER) router.push("/trainer/dashboard");
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                // Remove cookie with key "session"
                deleteCookie("session");
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </motion.div>
  );
}
