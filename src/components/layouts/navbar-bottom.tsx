import { AlarmClock, Bell, Home, Search, User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NavbarBottom() {
  return (
    <>
      <div className="fixed w-full bottom-0 bg-background block md:hidden py-1 px-5 z-[39] border-t border-solid border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4">
            <div className="flex justify-center">
              <Link href={"/"}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-12"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href={"/shalat"}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-12"
                  aria-label="Explore"
                >
                  <AlarmClock className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="size-12"
                aria-label="Notification"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Link href={"/user"}>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-12"
                  aria-label="Account"
                >
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
