"use client";
import { useButtonBack } from "@/components/providers/ButtonBackProvider";
import { useBottomNavbar } from "@/components/providers/NavbarBottomProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { localStorageUtils } from "@/lib/localStorageUtils";
import { cn } from "@/lib/utils";
import { Question, Quiz } from "@/model/quiz";
import { Answer, Submission } from "@/model/submission";
import { ChevronLeft, Loader, Settings } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Loading = {
  submitting: boolean;
};

export default function QuizAttemptComponent({ quiz }: { quiz: Quiz }) {
  const { useNavbarBottom, setUseNavbarBottom } = useBottomNavbar();
  const { setPreviousUrl } = useButtonBack();
  useEffect(() => {
    setUseNavbarBottom(false);
    setPreviousUrl(`/quiz/${quiz.slug}`);
    return () => {
      setUseNavbarBottom(true); // Show navbar when component unmounts/navigates away
    };
  }, [quiz.slug, setPreviousUrl, setUseNavbarBottom]);
  const questions = quiz.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [nowQuestion, setNowQuestion] = useState<Question | null>(
    questions[0] || null
  );
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map((q, index) => ({
      question_order: index,
      question_answer: "o",
    }))
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isDialogSubmitOpen, setIsDialogSubmitOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<Loading>({ submitting: false });
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission>({
    quiz_id: quiz.id,
    quiz_slug: quiz.slug,
    answers: answers,
  });

  let submissions = localStorageUtils.get("submissions") as Submission[] | null;
  if (!submissions) {
    submissions = [];
  }

  const nextQuestionHandler = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNowQuestion(questions[currentQuestionIndex + 1]);
      setSelectedAnswer(null); // Reset pilihan jawaban
    } else {
      setNowQuestion(null);
    }
  };
  const prevQuestionHandler = () => {
    if (currentQuestionIndex < questions.length + 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setNowQuestion(questions[currentQuestionIndex - 1]);
      setSelectedAnswer(null); // Reset pilihan jawaban
    } else {
      setNowQuestion(null);
    }
  };

  const setAnswer = (indexOfQuestion: number, answer: number) => {
    if (indexOfQuestion === currentQuestionIndex) {
      setSelectedAnswer(answer);
      setAnswers((prev) =>
        prev.map((item, index) =>
          index === indexOfQuestion
            ? { ...item, question_answer: `${answer}` }
            : item
        )
      );
    }
    console.log(answers);
  };

  const calculateScore = () => {
    let finalScore = 0;
    questions.forEach((q, index) => {
      // Logika penilaian: Jika jawaban yang dipilih sama dengan jawaban yang benar
      if (selectedAnswer !== null && selectedAnswer === q.answer) {
        finalScore++;
      }
    });
    return finalScore;
  };

  // Tampilkan pesan jika tidak ada pertanyaan
  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  // Tampilkan pesan jika kuis selesai
  if (nowQuestion === null) {
    const finalScore = calculateScore();
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>
          Your Score: {finalScore} / {questions.length}
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="px-5">
        <h2 className="text-2xl font-bold mb-4">
          {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-4">{nowQuestion.question}</p>
        <div className="space-y-2 mb-8">
          {nowQuestion.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-2 rounded-lg border border-solid",
                Number(answers[currentQuestionIndex].question_answer) == index
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
              )}
              onClick={() => setAnswer(currentQuestionIndex, index)}
            >
              <span className="font-semibold">{option.label}. </span>
              <span>{option.body}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed w-full bottom-0 px-4 py-3">
        <div className="flex w-full mb-3">
          <Button
            onClick={(e) => setIsDropdownOpen(!isDropdownOpen)}
            variant={"outline"}
            size={"icon"}
            className="ml-auto"
          >
            <Settings />
          </Button>
          <DropdownMenu onOpenChange={setIsDropdownOpen} open={isDropdownOpen}>
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex px-2 py-1 items-center">
                <span className="text-sm font-normal">Mode Gelap</span>
                <Switch
                  checked={theme == "dark"}
                  onCheckedChange={() =>
                    setTheme(theme == "dark" ? "light" : "dark")
                  }
                  className="ml-4"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-4 py-3 bg-background rounded-lg shadow-md border border-solid border-gray-200 dark:border-gray-800">
          <div className="flex w-full gap-x-3">
            {currentQuestionIndex !== questions.length - 1 ? (
              <>
                <Button
                  onClick={() => prevQuestionHandler()}
                  disabled={currentQuestionIndex == 0}
                >
                  Sebelumnya
                </Button>
                <Button
                  className="ml-auto"
                  onClick={() => nextQuestionHandler()}
                >
                  Selanjutnya
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => prevQuestionHandler()}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant={"primary"}
                  className="flex-1 transition-opacity duration-500"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDialogSubmitOpen(true);
                  }}
                >
                  Selesai
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <Dialog open={isDialogSubmitOpen} onOpenChange={setIsDialogSubmitOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-left">
            <DialogTitle>Selesai Kuis?</DialogTitle>
            <DialogDescription>
              Pastikan semua jawaban sudah kamu isi, ya. Setelah ini kamu nggak
              bisa mengubah jawaban lagi.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-x-3">
            <Button
              type="submit"
              variant={"primary"}
              onClick={(e) => {
                setLoading({ ...loading, submitting: true });

                localStorageUtils.set("submissions", [
                  ...submissions,
                  {
                    quiz_id: quiz.id,
                    quiz_slug: quiz.slug,
                    created_at: new Date(),
                    answers: answers,
                  },
                ]);
                // setTimeout(() => {
                setLoading({ ...loading, submitting: false });
                setIsDialogSubmitOpen(false);
                console.log(answers);
                router.push(`/quiz/${quiz.slug}`);
                // }, 5000);
              }}
              disabled={loading.submitting}
            >
              {loading.submitting && (
                <Loader className="w-4 h-4 animate-spin" />
              )}
              Selesai
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
