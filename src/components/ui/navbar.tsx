"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Flashcards</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/create">
            <Button variant="ghost">Buat Set</Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
