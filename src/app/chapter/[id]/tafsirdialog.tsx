"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Verse } from "@/types/chapter";
import { Tafsir, Word } from "@/types/tafsir";
import { Html } from "next/document";

export default function TafsirDialog({
  verse,
  tafsir,
  isTafsirDialogOpen,
  setTafsirDialogOpen,
}: {
  verse: Verse | null;
  tafsir: Tafsir | null;
  isTafsirDialogOpen: boolean;
  setTafsirDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isTafsirDialogOpen} onOpenChange={setTafsirDialogOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Quranic Verse Interpretation</DialogTitle>
          <DialogDescription>
            Understanding the Meaning and Context of Quranic Verses
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[80vh] w-full">
          <p className="verse inline-flex items-center relative">
            {verse?.text_uthmani}
          </p>
          <div dangerouslySetInnerHTML={{ __html: tafsir?.text ?? "" }} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
