"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

type ComponentProps = {
  questionId: string;
};

export const BookmarkButton = ({ questionId }: ComponentProps) => {
  const handleCopyLink = async () => {
    try {
      //   await navigator.clipboard.writeText(
      //     `http://localhost:3000/questions/${questionId}`,
      //   );
      console.log(questionId);
      toast.success("Question bookmarked");
    } catch (err) {
      console.log(err);
      toast.error("Question not bookmarked");
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full"
      onClick={handleCopyLink}
    >
      <Bookmark className="h-4 w-4" />
    </Button>
  );
};
