import { Verse, Word } from "@/types/chapter";

export default function Reading({ verses }: { verses: Verse[] }) {
  return (
    <>
      <div className="mb-4 verse flex flex-row-reverse justify-between items-center flex-wrap gap-2">
        {verses.map((verse: Verse, index: number) =>
          verse.words.map((word: Word, index2: number) => (
            <>
              {index2 != verse.words.length - 1 ? (
                <span key={index2} className="verse inline-flex">
                  {word.text_uthmani}
                </span>
              ) : (
                <span key={index} className="verse-omar">
                  ۝{verse.words[verse.words.length - 1].text_uthmani}{" "}
                </span>
              )}
            </>
          ))
        )}
      </div>
    </>
  );
}
