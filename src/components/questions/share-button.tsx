"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

type ComponentProps = {
  questionId: string;
};

export const ShareButton = ({ questionId }: ComponentProps) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/questions/${questionId}`,
      );
      toast.success("Link copied");
    } catch (err) {
      console.log(err);
      toast.error("Link not copied");
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
      <Share2 className="h-4 w-4" />
    </Button>
  );
};
