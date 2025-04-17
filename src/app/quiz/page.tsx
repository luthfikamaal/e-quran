import { Metadata } from "next";
import QuizComponent from "./profilecomponent";
import quizzes from "@/data/quiz.json";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Quiz page",
};

export default function QuizPage() {
  return <QuizComponent quizzes={quizzes} />;
}
