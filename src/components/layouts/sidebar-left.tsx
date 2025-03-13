"use client";

import apiClient2 from "@/lib/axiosclient2";
import { cn } from "@/lib/utils";
import { Chapter } from "@/types/quran";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarLeft({
  className,
  ...props
}: React.PropsWithChildren<{ className?: string }>) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await apiClient2.get<{ data: Chapter[] }>("/surah");
        setChapters(response.data.data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);
  return (
    <div
      className={`min-h-screen border-r border-l pt-20 border-solid border-gray-400 ${
        className || ""
      }`}
      {...props}
    >
      <div className="mb-4 pl-3">
        {chapters.map((chapter: Chapter, index: number) => (
          <Link
            href={`/chapter/${chapter.number}`}
            key={index}
            className={cn(
              "block px-3 py-2 rounded-md hover:bg-gray-100 text-sm transition-all hover:cursor-pointer mb-1 dark:hover:bg-gray-700",
              pathname == `/chapter/${chapter.number}` &&
                "bg-gray-200 dark:bg-gray-700"
            )}
          >
            {chapter.englishName}
          </Link>
        ))}
      </div>
    </div>
  );
}
