"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type ComponentProps = {
  questionId: string;
};

export const BookmarkButton = ({ questionId }: ComponentProps) => {

  const bookmarkMutation = api.question.bookmarkQuestionById.useMutation({
    onSuccess: () => {
      toast.success("Question bookmarked");
    },
    onError: () => {
      toast.error("Question not bookmarked");
    },
  });

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 rounded-full"
      onClick={() => bookmarkMutation.mutate({ questionId })}
    >
      <Bookmark className="h-4 w-4" />
    </Button>
  );
};
