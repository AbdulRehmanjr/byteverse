"use client";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useLoginDialog } from "~/hooks/use-login";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type ComponentProps = {
  likes: number;
  questionId: string;
};

export const LikeButton = ({ likes, questionId }: ComponentProps) => {
  const session = useSession();
  const utils = api.useUtils();
  const [count, setCount] = useState<number>(likes);
  const [isLike, setLike] = useState<boolean>(false);
  const { setIsLoginOpen } = useLoginDialog();
  const [liked] = api.question.checklikeQuestion.useSuspenseQuery({
    questionId: questionId,
  });

  const makeLike = api.question.likeQuestion.useMutation({
    onSuccess: () => {
      void utils.question.checklikeQuestion.refetch({ questionId });
    },
    onError: () => {
      setLike(false);
    },
  });

  useEffect(() => {
    setLike(liked);
  }, [liked]);

  const likeHandler = () => {
    if (!session.data?.user.id) {
      setIsLoginOpen(true);
    } else {
      setCount(() => count + 1);
      setLike(true);
      makeLike.mutate({ questionId: questionId });
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center text-sm text-muted-foreground"
      onClick={likeHandler}
    >
      <ThumbsUp className={cn("mr-1 h-4 w-4", isLike && "fill-red-800")} />
      <span>{count ?? 0}</span>
    </Button>
  );
};
