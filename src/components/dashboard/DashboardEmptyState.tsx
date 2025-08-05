import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardEmptyState({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <div className="text-center py-12">
      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        {searchQuery ? "Tidak ada hasil pencarian" : "Belum ada set flashcard"}
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
    </div>
  );
}
