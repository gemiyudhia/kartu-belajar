import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
};

export default function DashboardSearchSort({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: Props) {
  return (
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
  );
}
