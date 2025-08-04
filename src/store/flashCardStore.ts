import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Flashcard, FlashcardSet, QuizResult } from "@/types/flashcard";

interface FlashcardStore {
  sets: FlashcardSet[];
  currentSet: FlashcardSet | null;
  quizResults: QuizResult[];

  // Actions
  createSet: (title: string, description?: string) => FlashcardSet;
  updateSet: (setId: string, updates: Partial<FlashcardSet>) => void;
  deleteSet: (setId: string) => void;
  setCurrentSet: (set: FlashcardSet | null) => void;

  // Card actions
  addCard: (setId: string, question: string, answer: string) => void;
  updateCard: (
    setId: string,
    cardId: string,
    updates: Partial<Flashcard>
  ) => void;
  deleteCard: (setId: string, cardId: string) => void;

  // Quiz actions
  saveQuizResult: (result: QuizResult) => void;
  getQuizResults: (setId: string) => QuizResult[];
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      sets: [],
      currentSet: null,
      quizResults: [],

      createSet: (title: string, description?: string) => {
        const newSet: FlashcardSet = {
          id: crypto.randomUUID(),
          title,
          description,
          cards: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          sets: [...state.sets, newSet],
        }));

        return newSet;
      },

      updateSet: (setId: string, updates: Partial<FlashcardSet>) => {
        set((state) => ({
          sets: state.sets.map((set) =>
            set.id === setId
              ? { ...set, ...updates, updatedAt: new Date() }
              : set
          ),
        }));
      },

      deleteSet: (setId: string) => {
        set((state) => ({
          sets: state.sets.filter((set) => set.id !== setId),
          currentSet: state.currentSet?.id === setId ? null : state.currentSet,
        }));
      },

      setCurrentSet: (selectedSet: FlashcardSet | null) => {
        set({ currentSet: selectedSet });
      },

      addCard: (setId: string, question: string, answer: string) => {
        const newCard: Flashcard = {
          id: crypto.randomUUID(),
          question,
          answer,
        };

        set((state) => ({
          sets: state.sets.map((set) =>
            set.id === setId
              ? {
                  ...set,
                  cards: [...set.cards, newCard],
                  updatedAt: new Date(),
                }
              : set
          ),
        }));
      },

      updateCard: (
        setId: string,
        cardId: string,
        updates: Partial<Flashcard>
      ) => {
        set((state) => ({
          sets: state.sets.map((set) =>
            set.id === setId
              ? {
                  ...set,
                  cards: set.cards.map((card) =>
                    card.id === cardId ? { ...card, ...updates } : card
                  ),
                  updatedAt: new Date(),
                }
              : set
          ),
        }));
      },

      deleteCard: (setId: string, cardId: string) => {
        set((state) => ({
          sets: state.sets.map((set) =>
            set.id === setId
              ? {
                  ...set,
                  cards: set.cards.filter((card) => card.id !== cardId),
                  updatedAt: new Date(),
                }
              : set
          ),
        }));
      },

      saveQuizResult: (result: QuizResult) => {
        set((state) => ({
          quizResults: [...state.quizResults, result],
        }));
      },

      getQuizResults: (setId: string) => {
        return get().quizResults.filter((result) => result.setId === setId);
      },
    }),
    {
      name: "flashcard-storage",
    }
  )
);
