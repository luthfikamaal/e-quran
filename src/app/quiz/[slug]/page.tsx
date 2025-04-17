import quizzes from "@/data/quiz.json";
import { Quiz } from "@/model/quiz";
import { Metadata } from "next";
import QuizDetailComponent from "./quizdetail";

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const quiz = quizzes.find(
    (e: Quiz, index: number) => e.slug == params.slug
  ) as Quiz;
  return {
    title: quiz?.name,
  };
};

export default function QuizDetail({ params }: { params: { slug: string } }) {
  const quiz = quizzes.find((e: Quiz, index: number) => e.slug == params.slug);
  if (!quiz) {
    return <div>Quiz not found</div>;
  }
  return (
    <div className="px-5">
      <QuizDetailComponent quiz={quiz} />
    </div>
  );
}
