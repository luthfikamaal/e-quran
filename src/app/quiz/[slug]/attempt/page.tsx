import QuizAttemptComponent from "./attempt-component";
import quizzes from "@/data/quiz.json";
import { Quiz } from "@/model/quiz";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;
// Define the metadata generation with proper PageProps shape
export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { slug } = await params;
  const quiz = quizzes.find((e: Quiz) => e.slug === slug);
  return {
    title: quiz?.name ?? "Quiz Not Found",
  };
};

// Page component with correct prop type
export default async function AttemptPage({ params }: { params: Params }) {
  const { slug } = await params;
  const quiz = quizzes.find((e: Quiz) => e.slug === slug);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return <QuizAttemptComponent quiz={quiz} />;
}
