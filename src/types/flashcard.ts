export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashcardSet {
  id: string;
  title: string;
  description?: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizResult {
  setId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
}
