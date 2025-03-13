import Basmalah from "@/components/basmalah";
import serverApiClient from "@/lib/serverApiClient";
import { Chapter, ChapterV2, Verse } from "@/types/chapter";
import VerseComponent from "./verse";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Reading from "./reading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import chapters from "../../../data/chapters.json";
import { Metadata } from "next";

const fetchChapter = async (id: number) => {
  try {
    const response = await serverApiClient.get<Chapter>(
      `/verses/by_chapter/${id}?words=true&per_page=all&fields=text_uthmani,chapter_id,hizb_number,text_imlaei_simple&reciter=7&word_translation_language=id&word_fields=verse_key,verse_id,page_number,location,text_uthmani,text_indopak,qpc_uthmani_hafs&mushaf=7&filter_page_words=true&translations=131&from=${id}:1&to=${id}:10`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return null;
  }
};

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  const chapter = chapters.find((e: ChapterV2) => e.id == Number(params.id));
  return {
    title: chapter?.name_complex,
    description: chapter?.revelation_place,
  };
};

export default async function ChapterPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const data = await fetchChapter(id);
  const verses = data?.verses;
  const chapter = chapters.find((e: ChapterV2) => e.id == id);

  if (!data) {
    return <p className="text-center text-red-500">Failed to load chapter.</p>;
  }

  return (
    <div className="px-5 pb-16 pt-5">
      <div className="flex w-full items-center justify-center mb-6">
        <div>
          <div className="flex justify-center">
            <span className="surah-name">001</span>
            <span className="surah-name">surah</span>
          </div>
          {chapter?.bismillah_pre && <Basmalah />}
        </div>
      </div>
      {/* <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Translation</TabsTrigger>
          <TabsTrigger value="password">Reading</TabsTrigger>
        </TabsList>
        <TabsContent value="account"> */}
      <VerseComponent verses={verses ?? []} chapter={chapter} />
      {/* </TabsContent>
        <TabsContent value="password">
          <Reading verses={data.verses} />
        </TabsContent>
      </Tabs> */}
      <div className="mt-10">
        <div className="mx-auto max-w-xl flex gap-4">
          {id != 1 && (
            <Link href={`/chapter/${id - 1}`}>
              <Button variant={"outline"}>Previous</Button>
            </Link>
          )}
          {id != 114 && (
            <Link href={`/chapter/${id + 1}`} className="ml-auto">
              <Button variant={"outline"}>Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
