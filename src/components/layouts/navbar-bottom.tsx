"use client";
import {
  AlarmClock,
  Bell,
  Book,
  BookCheckIcon,
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
import { useBottomNavbar } from "../providers/NavbarBottomProvider";

export default function NavbarBottom() {
  const path = usePathname();
  const { useNavbarBottom } = useBottomNavbar();

  return (
    <>
      <div
        className={cn(
          "fixed w-full bottom-0 bg-background block md:hidden py-2 px-6 z-[39] border-t border-solid border-gray-200 dark:border-gray-800",
          !useNavbarBottom && "hidden"
        )}
      >
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
              <Link href="/quiz" className="flex items-center w-full">
                <Button
                  variant={path.startsWith("/quiz") ? "default" : "ghost"}
                  aria-label="Home"
                  size={path.startsWith("/quiz") ? "default" : "icon"}
                  className={cn(
                    "flex items-center gap-2 py-5 transition-all duration-200 ease-in-out",
                    "w-full"
                  )}
                >
                  <BookCheckIcon className="h-4 w-4" />
                  <span
                    className={cn(
                      "overflow-hidden inline-block transition-all duration-200 ease-in-out",
                      path.startsWith("/quiz") ? "w-[50px]" : "w-0 ml-0"
                    )}
                  >
                    <span className="inline-block text-sm">Quiz</span>
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
