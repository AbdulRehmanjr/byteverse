"use client";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useLoginDialog } from "~/hooks/use-login";

export const LikeButton = () => {
  const session = useSession();
  const [count, setCount] = useState<number>(0);
  const { setIsLoginOpen } = useLoginDialog();

  const likeHandler = () => {
    if (!session.data?.user.id) {
      setIsLoginOpen(true);
    } else {
      setCount(() => count + 1);
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center text-sm text-muted-foreground"
      onClick={likeHandler}
    >
      <ThumbsUp className="mr-1 h-4 w-4" />
      {/* <span>{question.likes || 0}</span> */}
      <span>{count}</span>
    </Button>
  );
};
