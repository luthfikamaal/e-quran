"use client";

import ScalingImageLink from "@/components/card-quiz";
import { useButtonBack } from "@/components/providers/ButtonBackProvider";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { Quiz } from "@/model/quiz";
import { Submission } from "@/model/submission";
import { useEffect } from "react";

type QuizProps = {
  quizzes: Quiz[];
};

export default function QuizComponent({ quizzes }: QuizProps) {
  const { setPreviousUrl } = useButtonBack();
  const submissions = localStorageUtils.get("submissions") as Submission[];
  let submitted_quiz_ids = submissions.map(
    (submission: Submission, i: number) => submission.quiz_id
  );
  // console.log(submitted_quiz_ids);

  useEffect(() => {
    setPreviousUrl(null);
  });
  return (
    <>
      <div className="px-5">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Quiz</h1>
          <p className="text-muted-foreground">Choose a quiz to start</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 px-1">
          {quizzes.map((quiz: Quiz, index: number) => (
            <ScalingImageLink
              name={quiz.name}
              key={index}
              thumbnail={"https://v0.dev/placeholder.svg"}
              isSubmitted={submitted_quiz_ids.includes(quiz.id)}
              slug={`/quiz/${quiz.slug}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
