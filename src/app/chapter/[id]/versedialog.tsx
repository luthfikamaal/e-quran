"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { cn } from "@/lib/utils";
import { ChapterV2, Verse } from "@/types/chapter";
import { Tafsir, Word } from "@/types/tafsir";
import { Bookmark, Heart, Save } from "lucide-react";
import { useState } from "react";

interface VerseRead {
  name: string;
  verse_key: string;
}

export default function VerseDialog({
  verse,
  chapter,
  isTafsirDialogOpen,
  setTafsirDialogOpen,
}: {
  verse: Verse | null;
  chapter: ChapterV2 | null;
  isTafsirDialogOpen: boolean;
  setTafsirDialogOpen: (open: boolean) => void;
}) {
  const fav_Verses = localStorageUtils.get("fav_verses") as VerseRead[] | [];
  const [isLike, setIsLike] = useState<boolean>(
    fav_Verses.length > 0
      ? fav_Verses.some((e: VerseRead) => e.verse_key == verse?.verse_key)
      : false
  );
  console.log(fav_Verses, verse?.verse_key, isLike);

  const { toast } = useToast();
  const setLastReadVerseHandler = (verse_key: string) => {
    localStorageUtils.set("last_read", {
      name: chapter?.name_complex ?? "",
      verse_key: verse_key,
    });
    setTafsirDialogOpen(false);
    toast({
      title: "Verse saved",
      description: "You have saved this verse for later",
    });
  };

  const setFavouriteVersesHandler = (verse_key: string) => {
    let fav_verses = localStorageUtils.get("fav_verses") as VerseRead[] | [];
    if (!fav_Verses) {
      localStorageUtils.set("fav_verses", []);
    }
    fav_verses = localStorageUtils.get("fav_verses") as VerseRead[] | [];
    fav_verses = fav_verses.filter(
      (e: VerseRead) => e.verse_key != verse?.verse_key
    );
    localStorageUtils.set("fav_verses", [
      ...fav_verses,
      {
        name: chapter?.name_complex ?? "",
        verse_key: verse_key,
      },
    ]);
    setTafsirDialogOpen(false);
    toast({
      title: "Verse saved",
      description: "You have saved this verse for later",
    });
  };

  return (
    <Dialog open={isTafsirDialogOpen} onOpenChange={setTafsirDialogOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-left">
            {chapter?.name_complex} : {verse?.verse_number}
          </DialogTitle>
          <DialogDescription className="text-left">
            {chapter?.translated_name.name}
          </DialogDescription>
        </DialogHeader>
        <div className="verse verse-omar">{verse?.text_uthmani}</div>
        {verse && (
          <div
            className="text-gray-700 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: verse.translations[0].text }}
          />
        )}
        <DialogFooter className="flex">
          <div className="ml-auto flex gap-x-3">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={(e) =>
                setFavouriteVersesHandler(verse?.verse_key ?? "-")
              }
            >
              <Heart
                className={cn(
                  isLike ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                )}
              />
            </Button>
            <Button
              variant={"destructive"}
              onClick={(e) => setLastReadVerseHandler(verse?.verse_key ?? "-")}
            >
              <Bookmark className="h-4 w-4" />
              Mark as Last Read
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
