"use client";
import Link from "next/link";
import ToogleMode from "../toggle-mode";
import { useButtonBack } from "../providers/ButtonBackProvider";

export default function NavbarTop() {
  const { previousUrl } = useButtonBack();

  return (
    <>
      <div className="fixed w-full px-5 border-b border-solid border-gray-200 dark:border-gray-800 bg-background z-[40]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center ml-1 h-[56px] py-4">
            {previousUrl && (
              <Link href={previousUrl}>
                <i className="fa-solid fa-chevron-left"></i>
              </Link>
            )}
            <div className="ml-auto">
              <ToogleMode />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
