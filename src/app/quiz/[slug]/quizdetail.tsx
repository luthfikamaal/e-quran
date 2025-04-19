"use client";

import { useButtonBack } from "@/components/providers/ButtonBackProvider";
import { useBottomNavbar } from "@/components/providers/NavbarBottomProvider";
import { Button } from "@/components/ui/button";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { cn } from "@/lib/utils";
import { Question, Quiz } from "@/model/quiz";
import { Answer, Submission } from "@/model/submission";
import { MessageCircleQuestionIcon, Scale, Star } from "lucide-react";
import Link from "next/link";
import path from "path";
import { useEffect } from "react";

type QuizDetailProps = {
  quiz?: Quiz;
};

export default function QuizDetailComponent({ quiz }: { quiz: Quiz }) {
  const { setPreviousUrl } = useButtonBack();
  const { useNavbarBottom, setUseNavbarBottom } = useBottomNavbar();
  useEffect(() => {
    setUseNavbarBottom(true);
    setPreviousUrl("/quiz");
  }, [setUseNavbarBottom]);

  let submissions = localStorageUtils.get("submissions") as Submission[] | [];
  let submission: Submission | null | undefined = null;
  let score: number = 0;
  if (submissions) {
    submission = submissions.find(
      (e: Submission, index: number) => e.quiz_id === quiz.id
    );
    submission?.answers.map((answer: Answer, i: number) => {
      if (
        quiz.questions[answer.question_order].answer ==
        Number(answer.question_answer)
      ) {
        score++;
      }
    });
  }

  return (
    <>
      <h1 className="text-2xl mb-3 font-semibold">{quiz?.name}</h1>
      <div className="grid grid-cols-2 gap-3">
        {submission && (
          <div className="border flex-col col-span-2 bg-background dark:bg-gray-900 items-center gap-4 border-gray-200 dark:border-gray-900 shadow-sm border-solid px-3 py-3 rounded-xl">
            <span className="flex mb-2 h-[50px] w-[50px] items-center justify-center bg-green-600 text-white rounded-lg">
              <Star />
            </span>
            <span className="text-xl font-semibold">
              Skor: {score} dari {quiz.questions.length}
            </span>
          </div>
        )}
        <div className="border flex-col bg-background dark:bg-gray-900 items-center gap-4 border-gray-200 dark:border-gray-900 shadow-sm border-solid px-3 py-3 rounded-xl">
          <span className="flex mb-2 h-[50px] w-[50px] items-center justify-center bg-red-600 text-white rounded-lg">
            <Scale />
          </span>
          <span className="text-xl font-semibold">Hard</span>
        </div>
        <div className="border flex-col bg-background dark:bg-gray-900 items-center gap-4 border-gray-200 dark:border-gray-900 shadow-sm border-solid px-3 py-3 rounded-xl">
          <span className="flex mb-2 h-[50px] w-[50px] items-center justify-center bg-blue-600 text-white rounded-lg">
            <MessageCircleQuestionIcon />
          </span>
          <span className="text-xl font-semibold">
            {quiz.questions.length} Questions
          </span>
        </div>
      </div>
      {submission ? (
        <>
          <div className="mt-5">
            {quiz.questions.map((question: Question, index: number) => (
              <div key={index}>
                <span className="text-xl w-[40px] h-[40px] flex items-center justify-center bg-gray-500 mb-2 text-white rounded-lg font-semibold">
                  {index + 1}
                </span>
                <p className="text-lg mb-4">{question.question}</p>
                <div className="space-y-2 mb-8">
                  {question.options.map((option, index2) => (
                    <div
                      key={index2}
                      className={cn(
                        "px-3 py-2 rounded-lg border border-solid",
                        question.answer == index2 &&
                          Number(submission.answers[index].question_answer) ==
                            question.answer
                          ? "bg-green-500 text-white border-green-600"
                          : Number(submission.answers[index].question_answer) ==
                              index2 &&
                            Number(submission.answers[index].question_answer) !=
                              question.answer
                          ? "!bg-red-500 text-white !border-red-600"
                          : question.answer == index2
                          ? "!bg-green-500 text-white !border-green-600"
                          : "bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
                      )}
                    >
                      <span className="font-semibold">{option.label}. </span>
                      <span>{option.body}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Link href={`/quiz/${quiz.slug}/attempt`}>
            <Button variant={"primary"} className="w-full mt-5" size={"lg"}>
              Start
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
