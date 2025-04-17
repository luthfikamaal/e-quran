export type Submission = {
  quiz_id: number;
  quiz_slug: string;
  answers: Answer[] | [];
  created_at?: string;
};

export type Answer = {
  question_order: number;
  question_answer: string;
};
