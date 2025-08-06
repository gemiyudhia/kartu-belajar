"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FlashcardForm from "./FlashcardForm";

interface CardForm {
  id: string;
  question: string;
  answer: string;
}

interface Props {
  cards: CardForm[];
  setCards: (cards: CardForm[]) => void;
}

const FlashcardList = ({ cards, setCards }: Props) => {
  const addCard = () => {
    setCards([...cards, { id: crypto.randomUUID(), question: "", answer: "" }]);
  };

  const updateCard = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Kartu Flashcard</h2>
        <Button type="button" onClick={addCard} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kartu
        </Button>
      </div>

      {cards.map((card, index) => (
        <FlashcardForm
          key={card.id}
          index={index}
          id={card.id}
          question={card.question}
          answer={card.answer}
          removable={cards.length > 1}
          onChange={(field, value) => updateCard(card.id, field, value)}
          onRemove={() => removeCard(card.id)}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
