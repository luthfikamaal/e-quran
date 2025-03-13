"use client";

import { AudioFile } from "@/types/audio";
import { Button } from "../ui/button";
import { useRef } from "react";

export default function PlayAudio({
  audioFile,
}: {
  audioFile: AudioFile | null;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    console.log("Play button clicked");
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio is playing");
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    } else {
      console.error("audioRef is null");
    }
  };

  return (
    <div className="fixed w-[calc(100%-40px)] py-3 bottom-3 bg-background border rounded-lg shadow-md border-slate-200/50 border-solid">
      <div className="flex px-24">
        <audio ref={audioRef} src={audioFile?.audio_url} preload="auto" />
        <div className="mx-auto w-full flex items-center justify-between">
          <Button variant={"ghost"} size={"icon"}>
            <i className="bi bi-caret-left-fill"></i>
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={handlePlay}>
            <i className="fa fa-play text-[24px]"></i>
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <i className="bi bi-caret-right-fill"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
