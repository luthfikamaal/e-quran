import QuizAttemptComponent from "./attempt-component";
import quizzes from "@/data/quiz.json";
import { Quiz } from "@/model/quiz";
import { Metadata } from "next";
type ParamProps = {
  slug: string;
};
export const generateMetadata = ({
  params,
}: {
  params: ParamProps;
}): Metadata => {
  const quiz = quizzes.find(
    (e: Quiz, index: number) => e.slug == params.slug
  ) as Quiz;
  return {
    title: quiz?.name,
  };
};
export default function AttemptPage({ params }: { params: ParamProps }) {
  const quiz = quizzes.find((e: Quiz, index: number) => e.slug == params.slug);
  if (!quiz) {
    return <div>Quiz not found</div>;
  }
  return <QuizAttemptComponent quiz={quiz} />;
}
