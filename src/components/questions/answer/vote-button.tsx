"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type ComponentProps = {
  vote: number;
  answerId: string;
};

export const VoteButton = ({ vote, answerId }: ComponentProps) => {
  const [updatedVote, setUpdatedVote] = useState<number>(vote);
  const updateVote = api.answer.makeVote.useMutation();

  const handleVoteUp = () => {
    const newVote = updatedVote + 1;
    setUpdatedVote(newVote);
    updateVote.mutate({ answerId, count: newVote });
  };

  const handleVoteDown = () => {
    const newVote = updatedVote - 1;
    setUpdatedVote(newVote);
    updateVote.mutate({ answerId, count: newVote });
  };

  return (
    <div className="grid place-items-center gap-2">
      <Button
        type="button"
        size="sm"
        aria-label="Vote up"
        onClick={handleVoteUp}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
      <p className={cn("font-text text-base font-medium")}>{updatedVote}</p>
      <Button
        type="button"
        size="sm"
        aria-label="Vote down"
        onClick={handleVoteDown}
        disabled={updatedVote <= 0}
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
};