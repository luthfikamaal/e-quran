"use client";
import { useButtonBack } from "@/components/providers/ButtonBackProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { ChapterV2, Verse, Word } from "@/types/chapter";
import { LastRead } from "@/types/user";
import { useEffect, useState } from "react";
import TafsirDialog from "./tafsirdialog";
import apiClient from "@/lib/axiosclient";
import { Tafsir } from "@/types/tafsir";
import VerseDialog from "./versedialog";
interface VerseComponentProps {
  verses: Verse[] | [];
  chapter?: ChapterV2 | null;
  key?: number;
}
export default function Reading({ verses, chapter }: VerseComponentProps) {
  const { setPreviousUrl } = useButtonBack();
  const [isTafsirDialogOpen, setIsTafsirDialogOpen] = useState<boolean>(false);
  const [verseTafsir, setVerseTafsir] = useState<Tafsir | null>(null);
  const userLastRead = localStorageUtils.get("last_read") as LastRead;
  const [lastRead, setLastRead] = useState<LastRead | null>(userLastRead);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>(verses);
  const [defaultVerse, setDefaultVerse] = useState<Verse | null>(null);
  const [showVerse, setShowVerse] = useState<Verse | null>(null);
  const [activeVerse, setActiveVerse] = useState<string | null>(null);
  const openTafsirDialog = async (verseKey: string) => {
    let response = await apiClient.get<{ tafsir: Tafsir }>(
      `/tafsirs/en-tafisr-ibn-kathir/by_ayah/${verseKey}?words=true&word_fields=verse_key,verse_id,page_number,location,text_uthmani,code_v1,qpc_uthmani_hafs&mushaf=2`
    );
    let x = verses.find((verse: Verse) => verse.verse_key == verseKey);
    console.log(x);
    setVerseTafsir(response.data.tafsir);
    setShowVerse(x ?? null);
    setIsTafsirDialogOpen(true);
  };
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
  }, [chapterVerses]);

  useEffect(() => {
    if (activeVerse) {
      setLastRead({
        name: chapter?.name_complex ?? "",
        verse_key: activeVerse,
      });
      // localStorageUtils.set("last_read", lastRead);
    }
  }, [activeVerse]);

  return (
    <>
      <div className="mb-4 verse flex flex-row-reverse justify-between items-center flex-wrap gap-2 verse-section">
        {verses.map((verse: Verse, index: number) =>
          verse.words.map((word: Word, index2: number) => (
            <span key={index2}>
              {index2 != verse.words.length - 1 ? (
                <span className="verse inline-flex">{word.text_uthmani}</span>
              ) : (
                <button
                  className="verse-omar verse-section"
                  id={verse.verse_key}
                  onClick={(e) => openTafsirDialog(verse.verse_key)}
                >
                  ۝{verse.words[verse.words.length - 1].text_uthmani}{" "}
                </button>
              )}
            </span>
          ))
        )}
      </div>
      <VerseDialog
        verse={showVerse ?? null}
        isTafsirDialogOpen={isTafsirDialogOpen}
        setTafsirDialogOpen={setIsTafsirDialogOpen}
        chapter={chapter ?? null}
      />
    </>
  );
}
