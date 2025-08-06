"use server";

import { useFlashcardStore } from "@/store/flashCardStore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFlashcardSet(formData: FormData) {
  const { createSet, addCard } = useFlashcardStore.getState();

  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const cards = JSON.parse(formData.get("cards") as string) as {
    question: string;
    answer: string;
  }[];

  if (!title || cards.length === 0) {
    throw new Error("Judul dan minimal satu kartu diperlukan.");
  }

  const newSet = createSet(title, description || undefined);

  cards.forEach((card) => {
    addCard(newSet.id, card.question.trim(), card.answer.trim());
  });

  revalidatePath("/");
  redirect("/");
}
