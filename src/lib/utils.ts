import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitChapterVerses(
  chapter: number,
  totalVerses: number,
  maxVerses: number = 10
) {
  const result = [];
  let currentStart = 1;

  while (currentStart <= totalVerses) {
    const currentEnd = Math.min(currentStart + maxVerses - 1, totalVerses);
    result.push({
      from: `${chapter}:${currentStart}`,
      to: `${chapter}:${currentEnd}`,
    });
    currentStart = currentEnd + 1;
  }

  return result;
}

export function formatDates(dates: string): string {
  return dates
    .split("-")
    .map((date: string) => {
      return date.replace(/-0/g, "-"); // Menghapus nol di bulan dan hari
    })
    .join("-");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
