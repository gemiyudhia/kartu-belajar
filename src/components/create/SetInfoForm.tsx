"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  title: string;
  description: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}

const SetInfoForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: Props) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="title">Judul Set *</Label>
      <Input
        id="title"
        name="title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />
    </div>
    <div>
      <Label htmlFor="description">Deskripsi (Opsional)</Label>
      <Textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        rows={3}
      />
    </div>
  </div>
);

export default SetInfoForm;
