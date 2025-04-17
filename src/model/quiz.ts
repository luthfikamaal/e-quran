export type Question = {
  id: number;
  question: string;
  options: {
    label: string;
    body: string;
  }[];
  answer: number;
};

export type Quiz = {
  id: number;
  slug: string;
  name: string;
  questions: Question[];
};
