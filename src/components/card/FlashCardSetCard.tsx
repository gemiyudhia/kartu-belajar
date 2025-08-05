import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Play, Edit, Trash2, Brain } from "lucide-react";
import { FlashcardSet } from "@/types/flashcard";

interface FlashcardSetCardProps {
  set: FlashcardSet;
  index: number;
}

const FlashcardSetCard = ({ set, index }: FlashcardSetCardProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2"></CardTitle>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/edit/}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">kartu</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("id-ID")}
              </span>
            </div>

            <div className="flex gap-2">
              <Button asChild className="flex-1" size="sm">
                <Link href={`/study/`}>
                  <Play className="h-4 w-4 mr-2" />
                  Pelajari
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 bg-transparent"
                size="sm"
              >
                <Link href={`/quiz/`}>
                  <Brain className="h-4 w-4 mr-2" />
                  Kuis
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Set Flashcard</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus set flashcard ini? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FlashcardSetCard;
