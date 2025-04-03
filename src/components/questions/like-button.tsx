"use client";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useLogin, } from "~/hooks/use-login";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type ComponentProps = {
  likes: number;
  liked:boolean
  questionId: string;
};

export const LikeButton = ({ likes, liked,questionId }: ComponentProps) => {
  const session = useSession();
  const utils = api.useUtils();
  const [count, setCount] = useState<number>(likes);
  const [isLike, setLike] = useState<boolean>(false);
  const { setIsLogin } = useLogin();

  const makeLike = api.question.likeQuestion.useMutation({
    onSuccess: () => {
      void utils.question.getLikedQuestionByMe.refetch();
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
      setIsLogin(true);
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
