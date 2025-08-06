"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import SetInfoForm from "./SetInfoForm";
import FlashcardList from "./FlashcardList";
import { createFlashcardSet } from "@/hooks/actions/flashcard";

interface CardForm {
  id: string;
  question: string;
  answer: string;
}

const CreateSetClientPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<CardForm[]>([]);

  useEffect(() => {
    setCards([
      { id: crypto.randomUUID(), question: "", answer: "" },
      { id: crypto.randomUUID(), question: "", answer: "" },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validCards = cards.filter(
      (card) => card.question.trim() && card.answer.trim()
    );

    if (!title.trim() || validCards.length === 0) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cards", JSON.stringify(validCards));

    await createFlashcardSet(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Set</CardTitle>
        </CardHeader>
        <CardContent>
          <SetInfoForm
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <FlashcardList cards={cards} setCards={setCards} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Simpan Set
        </Button>
      </div>
    </form>
  );
};

export default CreateSetClientPage;
