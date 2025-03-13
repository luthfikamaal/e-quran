"use client";
import apiClient from "@/lib/axiosclient";
import { Chapter } from "@/types/quran";
import { useEffect } from "react";

export default function ChapterTest() {
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await apiClient.get<{ data: Chapter[] }>("/surah/1");
        console.log(response);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);
  return "Hello";
}
