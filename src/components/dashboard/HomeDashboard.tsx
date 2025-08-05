"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useFlashcardStore } from "@/store/flashCardStore";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSearchSort from "@/components/dashboard/DashboardSearchSort";
import DashboardEmptyState from "@/components/dashboard/DashboardEmptyState";
import FlashcardSetCard from "../card/FlashcardSetCard";

export default function HomeDashboard() {
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <DashboardHeader />
      <DashboardSearchSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredAndSortedSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSets.map((set, index) => (
            <FlashcardSetCard key={set.id} set={set} index={index} />
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DashboardEmptyState searchQuery={searchQuery} />
        </motion.div>
      )}
    </motion.div>
  );
}
