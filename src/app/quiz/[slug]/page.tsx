import quizzes from "@/data/quiz.json";
import { Quiz } from "@/model/quiz";
import { Metadata } from "next";
import QuizDetailComponent from "./quizdetail";

type Params = Promise<{ slug: string }>;

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { slug } = await params;
  const quiz = quizzes.find((e: Quiz, index: number) => e.slug == slug) as Quiz;
  return {
    title: quiz?.name,
  };
};

export default async function QuizDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const quiz = quizzes.find((e: Quiz, index: number) => e.slug == slug);
  if (!quiz) {
    return <div>Quiz not found</div>;
  }
  return (
    <div className="px-5">
      <QuizDetailComponent quiz={quiz} />
    </div>
  );
}
