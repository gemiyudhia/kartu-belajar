"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  index: number;
  id: string;
  question: string;
  answer: string;
  onChange: (field: "question" | "answer", value: string) => void;
  onRemove: () => void;
  removable: boolean;
}

 const FlashcardForm = ({
  index,
  id,
  question,
  answer,
  onChange,
  onRemove,
  removable,
}: Props) => (
  <div className="border rounded-lg p-4 space-y-4">
    <div className="flex items-center justify-between">
      <h4 className="font-medium">Kartu {index + 1}</h4>
      {removable && (
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`question-${id}`}>Pertanyaan</Label>
        <Textarea
          id={`question-${id}`}
          value={question}
          onChange={(e) => onChange("question", e.target.value)}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor={`answer-${id}`}>Jawaban</Label>
        <Textarea
          id={`answer-${id}`}
          value={answer}
          onChange={(e) => onChange("answer", e.target.value)}
          rows={3}
        />
      </div>
    </div>
  </div>
);

export default FlashcardForm;
