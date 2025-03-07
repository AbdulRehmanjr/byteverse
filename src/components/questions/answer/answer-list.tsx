"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn, parseHtml } from "~/lib/utils";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { AddResponseForm } from "~/components/questions/answer/add-answer";

dayjs.extend(relativeTime);

export const ResponseList = ({ questionId }: { questionId: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  // Get total count for pagination using suspense
  const [data, { isLoading }] =
    api.answer.getAnswersByQuestionId.useSuspenseQuery({
      questionId,
      limit,
      skip: (currentPage - 1) * limit,
    });

  const answers = data?.items || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Get liked answers
  //   const likedanswers = api.response.getLikedanswers.useSuspenseQuery();
  //   const likeMutation = api.response.likeResponse.useMutation();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //   const handleLike = (responseId: string) => {
  //     likeMutation.mutate({ responseId });
  //   };

  if (answers.length === 0 && !isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Answers</h2>
        </div>

        <Card className="border-l-4 border-l-primary/30 bg-gray-50 dark:bg-gray-900">
          <CardContent className="py-6">
            <p className="text-center text-gray-950 dark:text-gray-200">
              No answers yet. Be the first to respond!
            </p>
          </CardContent>
        </Card>

        <AddResponseForm questionId={questionId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">
          Answers ({totalCount})
        </h2>
        <Button variant="outline" size="sm">
          Most Recent
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {answers.map((answer) => (
            <Card
              key={answer.answerId}
              className="border-l-4 border-l-primary/30"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 ring-offset-1">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${answer.user.userName}.png`}
                      />
                      <AvatarFallback>{answer.user.userName}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-950 dark:text-gray-100">
                        {answer.user.userName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {dayjs(answer.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className="grid place-items-center gap-2">
                    <Button size="sm" aria-label="Vote up">
                      <ChevronUp className="h-5 w-5" />
                    </Button>

                    <p className={cn("text-base font-medium font-text")}>{answer.vote}</p>

                    <Button size="sm" aria-label="Vote down">
                      <ChevronDown className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert prose-headings:text-primary prose-a:text-primary max-w-none">
                  {parseHtml(answer.content)}
                </div>
              </CardContent>
              <CardFooter className="pb-2 pt-0">
                {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 h-8 px-2 hover:text-primary"
                    onClick={() => handleLike(answer.id)}
                    disabled={likeMutation.isPending}
                  >
                    <Heart 
                      className={`h-4 w-4 ${likedanswers.data?.includes(answer.id) ? "fill-primary text-primary" : ""}`} 
                    />
                    <span>{answer._count.answerLike}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 h-8 px-2 hover:text-primary">
                    <MessageCircle className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                </div> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="rounded-xl border border-primary/20 p-2 shadow-sm">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer transition-colors duration-300 hover:bg-primary/10"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "transition-colors duration-300 hover:bg-primary/10"
                  }
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer transition-colors duration-300 hover:bg-primary/10"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <AddResponseForm questionId={questionId} />
    </div>
  );
};
