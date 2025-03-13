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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { LastRead, User } from "@/types/user";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import chapters from "../data/chapters.json";
import { Chapter } from "@/types/quran";
import { ChapterV2 } from "@/types/chapter";
import Link from "next/link";
import { useButtonBack } from "@/components/providers/ButtonBackProvider";

interface Loadings {
  updateProfileLoading: boolean;
}

export default function HomeComponent() {
  const defaultUser = localStorageUtils.get("user") as User;
  const [loading, setLoading] = useState<Loadings>({
    updateProfileLoading: false,
  });

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(defaultUser);
  const lastRead = localStorageUtils.get("last_read") as LastRead;
  const { setPreviousUrl } = useButtonBack();
  const [chaptersList, setChaptersList] = useState<ChapterV2[]>(chapters);

  useEffect(() => {
    setPreviousUrl(null);
  }, []);
  const updateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading({
      ...loading,
      updateProfileLoading: true,
    });
    e.preventDefault();
    localStorageUtils.set("user", user);
    setIsDialogOpen(false);
    setLoading({
      ...loading,
      updateProfileLoading: false,
    });
  };

  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <div>
          <p>Hello</p>
          <h1 className="text-xl font-semibold">
            {defaultUser?.name || "World"}!
          </h1>
        </div>
        <button
          className="h-[12px] w-[12px]"
          onClick={(e) => setIsDialogOpen(true)}
        >
          <i className="fa-solid fa-pen text-[12px]"></i>
        </button>
      </div>
      <div className="rounded-lg w-full text-white  bg-blue-500 px-8 py-7">
        <div className="flex items-center gap-3 mb-2">
          <i className="fa-duotone fa-book-open-cover"></i>
          Last read
        </div>
        {lastRead ? (
          <Link
            className="text-white"
            href={
              `/chapter/${lastRead.verse_key.split(":")[0]}#` +
              lastRead.verse_key
            }
          >
            <h1 className="text-3xl font-semibold">
              {lastRead.name} : {lastRead.verse_key.split(":")[1]}
            </h1>
            {/* <span className="text-sm">
              Ayah number {lastRead.verse_key.split(":")[1]}
            </span> */}
          </Link>
        ) : (
          <h1 className="text-white text-xl font-semibold">
            You haven't started reading the Quran yet
          </h1>
        )}
      </div>
      <Input
        className="mt-10"
        placeholder="Search surah..."
        onChange={(e) => {
          e.preventDefault();
          console.log(e.target.value);
          setTimeout(() => {
            let newChapters = chapters.filter((chapter: ChapterV2) => {
              return chapter.name_simple
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            });
            setChaptersList(newChapters);
          }, 1000);
        }}
      />
      <div className="flex-col gap-3 mt-2">
        {chaptersList.map((chapter: ChapterV2, index: number) => (
          <Link
            key={index}
            className="flex py-3 border-b border-solid border-slate-300 items-center"
            href={`/chapter/${chapter.id}`}
          >
            <span className="flex items-center font-bold justify-center h-[44px] w-[44px] rounded-lg border bg-blue-500/30 text-blue-600 text-lg mr-3">
              {chapter.id}
            </span>
            <div>
              <h1 className="text-lg font-semibold ">{chapter.name_complex}</h1>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {chapter.translated_name.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-left">Edit profile</DialogTitle>
            <DialogDescription className="text-left">
              Your data is stored locally in your browser. Avoid clearing
              browser data to retain it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={updateProfile}>
            <div className="mt-3 mb-5">
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                defaultValue={user?.name || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading.updateProfileLoading}>
                {loading.updateProfileLoading && (
                  <Loader2 className="animate-spin h-4 w-4" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
