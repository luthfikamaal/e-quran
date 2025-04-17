import QuizAttemptComponent from "./attempt-component";
import quizzes from "@/data/quiz.json";
import { Quiz } from "@/model/quiz";
import { Metadata } from "next";

// Define the metadata generation with proper PageProps shape
export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const quiz = quizzes.find((e: Quiz) => e.slug === params.slug);
  return {
    title: quiz?.name ?? "Quiz Not Found",
  };
};

// Page component with correct prop type
export default function AttemptPage({ params }: { params: { slug: string } }) {
  const quiz = quizzes.find((e: Quiz) => e.slug === params.slug);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return <QuizAttemptComponent quiz={quiz} />;
}
