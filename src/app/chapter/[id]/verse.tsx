"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import apiClient from "@/lib/axiosclient";
import { Chapter, ChapterV2, Verse } from "@/types/chapter";
import { Tafsir } from "@/types/tafsir";
import { useEffect, useState } from "react";
import TafsirDialog from "./tafsirdialog";
import { LastRead } from "@/types/user";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { useButtonBack } from "@/components/providers/ButtonBackProvider";
import { cn, splitChapterVerses } from "@/lib/utils";
import apiClient2 from "@/lib/axiosclient2";
import PlayAudio from "@/components/layouts/playaudio";
import { AudioFile } from "@/types/audio";

interface VerseComponentProps {
  verses: Verse[] | [];
  chapter?: ChapterV2 | null;
  key?: number;
}

interface SplitChapterVerse {
  from: string;
  to: string;
}

export default function VerseComponent({
  verses,
  chapter,
}: VerseComponentProps) {
  const [isTafsirDialogOpen, setIsTafsirDialogOpen] = useState<boolean>(false);
  const [verseTafsir, setVerseTafsir] = useState<Tafsir | null>(null);
  const [verseKey, setVerseKey] = useState<string | null>("");
  const openTafsirDialog = async (verseKey: string) => {
    let response = await apiClient.get<{ tafsir: Tafsir }>(
      `/tafsirs/en-tafisr-ibn-kathir/by_ayah/${verseKey}?words=true&word_fields=verse_key,verse_id,page_number,location,text_uthmani,code_v1,qpc_uthmani_hafs&mushaf=2`
    );
    setVerseTafsir(response.data.tafsir);
    setIsTafsirDialogOpen(true);
  };
  const chapterVersesSplitted = splitChapterVerses(
    chapter?.id ?? 1,
    chapter?.verses_count ?? 10,
    10
  );
  const userLastRead = localStorageUtils.get("last_read") as LastRead;
  const [lastRead, setLastRead] = useState<LastRead | null>(userLastRead);
  const [defaultVerse, setDefaultVerse] = useState<Verse | null>(null);
  const [activeVerse, setActiveVerse] = useState<string | null>(null);
  const { setPreviousUrl } = useButtonBack();
  const [chapterVerses, setChapterVerses] = useState<Verse[]>(verses);
  const [indexOfLastSplitChapterVerses, setIndexOfLastSplitChapterVerses] =
    useState<number>(0);
  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<AudioFile | null>();

  useEffect(() => {
    setPreviousUrl("/");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVerse(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll(".verse-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (activeVerse) {
      setLastRead({
        name: chapter?.name_complex ?? "",
        verse_key: activeVerse,
      });
      localStorageUtils.set("last_read", lastRead);
    }
  }, [activeVerse]);

  useEffect(() => {
    // const handleScroll = () => {
    //   if (
    //     window.innerHeight + window.scrollY >=
    //     document.documentElement.scrollHeight
    //   ) {
    //     loadMoreVerse();
    //   }
    // };
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 30;
      if (
        scrollPosition >= threshold &&
        indexOfLastSplitChapterVerses < chapterVersesSplitted.length - 1
      ) {
        loadMoreVerse();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [indexOfLastSplitChapterVerses]);

  const loadMoreVerse = async () => {
    const { from, to } =
      chapterVersesSplitted[indexOfLastSplitChapterVerses + 1];
    setIndexOfLastSplitChapterVerses((prev) => prev + 1);
    console.log(to);
    const newVerses = await apiClient.get<Chapter>(
      `/verses/by_chapter/${chapter?.id}?words=true&per_page=all&fields=text_uthmani,chapter_id,hizb_number,text_imlaei_simple&reciter=7&word_translation_language=id&word_fields=verse_key,verse_id,page_number,location,text_uthmani,text_indopak,qpc_uthmani_hafs&mushaf=7&filter_page_words=true&translations=131&from=${chapterVersesSplitted[0].from}&to=${to}`
    );
    setChapterVerses([...newVerses.data.verses]);
  };

  const playAudio = async (verse_key: string) => {
    setIsAudioPlay(true);
    const response = await apiClient.get<AudioFile>(
      `audio/reciters/7/audio_files?chapter=${chapter?.id}&segments=true`
    );
    const audioFile = response.data;
  };

  return (
    <>
      {chapterVerses?.map((verse: Verse, index: number) => (
        <div
          className="text-right font-semibold text-2xl mb-3 border-b border-solid border-gray-400 verse verse-section"
          id={verse.verse_key}
          key={index}
        >
          <div className="flex">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                {verse.verse_key}
              </span>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={(e) => openTafsirDialog(verse.verse_key)}
                  >
                    <i className="fa fa-book"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tafsir</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => playAudio(verse.verse_key)}
                  >
                    <i className="fa fa-play"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Play</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <p className="verse inline-flex items-center relative">
            {verse.text_uthmani}
          </p>
          <div
            className="text-base mt-2 font-normal mb-4 text-slate-700 dark:text-slate-300 text-left"
            dangerouslySetInnerHTML={{ __html: verse.translations[0].text }}
          />
        </div>
      ))}
      {indexOfLastSplitChapterVerses < chapterVersesSplitted.length - 1 && (
        <div className="flex">
          <Button
            className="mx-auto"
            onClick={loadMoreVerse}
            variant={"outline"}
          >
            Load more
          </Button>
        </div>
      )}
      <TafsirDialog
        verse={defaultVerse ?? null}
        isTafsirDialogOpen={isTafsirDialogOpen}
        setTafsirDialogOpen={setIsTafsirDialogOpen}
        tafsir={verseTafsir}
      />
      {/* <div className={cn(isAudioPlay ? "block" : "hidden")}>
        <PlayAudio audioFile={audioFile ?? null} />
      </div> */}
    </>
  );
}
