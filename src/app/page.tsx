"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
// import { FlashcardSetCard } from "@/components/card/FlashCardSetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, BookOpen } from "lucide-react";
import { useFlashcardStore } from "@/store/flashCardStore";
import Link from "next/link";

export default function HomePage() {
  const sets = useFlashcardStore((state) => state.sets);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");

  const filteredAndSortedSets = useMemo(() => {
    const filtered = sets.filter(
      (set) =>
        set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (set.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false)
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "cards":
          return b.cards.length - a.cards.length;
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "updated":
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });
  }, [sets, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Flashcards</h1>
              <p className="text-muted-foreground">
                Kelola dan pelajari set flashcard Anda
              </p>
            </div>

            <Button asChild size="lg">
              <Link href="/create">
                <Plus className="h-5 w-5 mr-2" />
                Buat Set Baru
              </Link>
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari set flashcard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Terakhir diperbarui</SelectItem>
                <SelectItem value="created">Terakhir dibuat</SelectItem>
                <SelectItem value="title">Judul A-Z</SelectItem>
                <SelectItem value="cards">Jumlah kartu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Flashcard Sets Grid */}
        {filteredAndSortedSets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {filteredAndSortedSets.map((set, index) => (
              // <FlashcardSetCard key={set.id} set={set} index={index} />
            ))} */}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery
                ? "Tidak ada hasil pencarian"
                : "Belum ada set flashcard"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Coba kata kunci yang berbeda atau buat set baru"
                : "Mulai belajar dengan membuat set flashcard pertama Anda"}
            </p>
            {!searchQuery && (
              <Button asChild size="lg">
                <Link href="/create">
                  <Plus className="h-5 w-5 mr-2" />
                  Buat Set Pertama
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
