"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { useFlashcardStore } from "@/store/flashCardStore";
import { Navbar } from "@/components/ui/navbar";

interface CardForm {
  id: string;
  question: string;
  answer: string;
}

const CreateSetPage = () => {
  const router = useRouter();
  const createSet = useFlashcardStore((state) => state.createSet);
  const addCard = useFlashcardStore((state) => state.addCard);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<CardForm[]>([]);

  // ⛑ Hindari SSR mismatch dengan memindahkan UUID ke client-side
  useEffect(() => {
    setCards([
      { id: crypto.randomUUID(), question: "", answer: "" },
      { id: crypto.randomUUID(), question: "", answer: "" },
    ]);
  }, []);

  const addNewCard = () => {
    setCards((prev) => [
      ...prev,
      { id: crypto.randomUUID(), question: "", answer: "" },
    ]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const updateCard = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Judul set tidak boleh kosong");
      return;
    }

    const validCards = cards.filter(
      (card) => card.question.trim() && card.answer.trim()
    );

    if (validCards.length === 0) {
      toast.error("Minimal harus ada satu kartu yang lengkap");
      return;
    }

    const newSet = createSet(title.trim(), description.trim() || undefined);

    validCards.forEach((card) => {
      addCard(newSet.id, card.question.trim(), card.answer.trim());
    });

    toast.success(
      `Set "${title}" berhasil dibuat dengan ${validCards.length} kartu`
    );

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Buat Set Flashcard Baru</h1>
            <p className="text-muted-foreground">
              Buat set flashcard untuk membantu proses belajar Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informasi Set */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Set</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Set *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul set flashcard"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi (Opsional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi singkat tentang set ini"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Daftar Kartu */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Kartu Flashcard</CardTitle>
                  <Button type="button" onClick={addNewCard} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Kartu
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Kartu {index + 1}</h4>
                      {cards.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`question-${card.id}`}>
                          Pertanyaan
                        </Label>
                        <Textarea
                          id={`question-${card.id}`}
                          value={card.question}
                          onChange={(e) =>
                            updateCard(card.id, "question", e.target.value)
                          }
                          placeholder="Masukkan pertanyaan"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`answer-${card.id}`}>Jawaban</Label>
                        <Textarea
                          id={`answer-${card.id}`}
                          value={card.answer}
                          onChange={(e) =>
                            updateCard(card.id, "answer", e.target.value)
                          }
                          placeholder="Masukkan jawaban"
                          rows={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Batal
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Simpan Set
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateSetPage;
