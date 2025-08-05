import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Belajarin</h1>
        <p className="text-muted-foreground">
          Kelola dan pelajari set flashcard Anda
        </p>
      </div>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/create">
          <Plus className="h-5 w-5 mr-2" />
          Buat Set Baru
        </Link>
      </Button>
    </div>
  );
}
