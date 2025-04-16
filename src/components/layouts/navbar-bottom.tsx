"use client";
import {
  AlarmClock,
  Bell,
  Clock,
  Heart,
  Home,
  Search,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavbarBottom() {
  const path = usePathname();
  // check if the current path is the home page
  // const isHome = path === "/";

  return (
    <>
      <div className="fixed w-full bottom-0 bg-background block md:hidden py-2 px-6 z-[39] border-t border-solid border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex justify-center">
              <Link href="/" className="flex items-center w-full">
                <Button
                  variant={path === "/" ? "default" : "ghost"}
                  aria-label="Home"
                  size={path == "/" ? "default" : "icon"}
                  className={cn(
                    "flex items-center gap-2 py-5 transition-all duration-200 ease-in-out",
                    "w-full"
                  )}
                >
                  <Home className="h-4 w-4 " />
                  <span
                    className={cn(
                      "overflow-hidden inline-block transition-all duration-300 ease-in-out",
                      path === "/" ? "w-[50px]" : "w-0 ml-0"
                    )}
                  >
                    <span className="inline-block text-sm">Home</span>
                  </span>
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/shalat" className="flex items-center w-full">
                <Button
                  variant={path === "/shalat" ? "default" : "ghost"}
                  aria-label="Home"
                  size={path == "/shalat" ? "default" : "icon"}
                  className={cn(
                    "flex items-center gap-2 py-5 transition-all duration-300 ease-in-out",
                    "w-full"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  <span
                    className={cn(
                      "overflow-hidden inline-block transition-all duration-300 ease-in-out",
                      path === "/shalat" ? "w-[50px]" : "w-0 ml-0"
                    )}
                  >
                    <span className="inline-block text-sm">Shalat</span>
                  </span>
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/user" className="flex items-center w-full">
                <Button
                  variant={path === "/user" ? "default" : "ghost"}
                  aria-label="Home"
                  size={path == "/user" ? "default" : "icon"}
                  className={cn(
                    "flex items-center gap-2 py-5 transition-all duration-200 ease-in-out",
                    "w-full"
                  )}
                >
                  <User className="h-4 w-4" />
                  <span
                    className={cn(
                      "overflow-hidden inline-block transition-all duration-200 ease-in-out",
                      path === "/user" ? "w-[50px]" : "w-0 ml-0"
                    )}
                  >
                    <span className="inline-block text-sm">User</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
