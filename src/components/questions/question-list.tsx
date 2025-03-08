"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Clock, Tag, Eye, Loader2, MessageCircle } from "lucide-react";
import dayjs from "dayjs";
import { parseHtml } from "~/lib/utils";
import { LikeButton } from "~/components/questions/like-button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";
import { useSession } from "next-auth/react";

export const QuestionList = () => {
  const session = useSession();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  // Get total count for pagination using suspense
  const [totalCount] = api.question.getQuestionCount.useSuspenseQuery();
  const likedByMe = api.question.getLikedQuestionByMe.useQuery(undefined, {
    enabled: session.data ? true : false,
  });

  // Calculate pagination values
  const skip = (currentPage - 1) * limit;
  const totalPages = totalCount ? Math.ceil(totalCount / limit) : 0;

  // Fetch questions with pagination using suspense
  const [data, { isFetching }] = api.question.getAllQuestions.useSuspenseQuery({
    limit,
    skip,
  });

  const questions = data?.items || [];

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6 rounded-xl bg-gradient-to-b from-gray-50 to-white p-6 py-4 transition-all duration-500 dark:from-gray-950 dark:to-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Questions</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Tag className="mr-2 h-4 w-4" />
                Filter by tag
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Tags</DropdownMenuItem>
              <DropdownMenuItem>JavaScript</DropdownMenuItem>
              <DropdownMenuItem>React</DropdownMenuItem>
              <DropdownMenuItem>Next.js</DropdownMenuItem>
              <DropdownMenuItem>TypeScript</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button type="button" asChild>
            <Link href="/questions/ask">Ask Question</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6 transition-all duration-500">
        {questions.map((question) => (
          <div
            key={question.questionId}
            className="transition-all duration-500 hover:-translate-y-1"
          >
            <Card
              className={cn(
                "group overflow-hidden border-l-4 border-l-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10",
              )}
            >
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-2 transition-all duration-300 dark:from-gray-900 dark:to-gray-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/30 ring-offset-2 transition-all duration-300">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${question.questionId}.png`}
                      />
                      <AvatarFallback>
                        {question.title.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-bold text-primary hover:underline group-hover:to-primary">
                      <Link href={`/questions/${question.questionId}`}>
                        {question.title}
                      </Link>
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {dayjs(question.createdAt).format("DD.MM.YYYY")}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="bg-opacity-50 py-4 transition-all duration-500">
                <div
                  className={cn(
                    "mb-4 line-clamp-3 text-muted-foreground transition-all duration-500",
                  )}
                >
                  {parseHtml(question.content)}
                </div>

                <div className="my-3 flex flex-wrap gap-3 transition-all duration-300">
                  {question.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="default"
                      className="flex items-center"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t bg-gray-50 bg-opacity-50 pt-3 backdrop-blur-sm transition-all duration-300 dark:bg-gray-900">
                <div className="flex items-center gap-2 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:bg-primary/10 hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{question._count.Answer ?? 0} replies</span>
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="mr-1 h-4 w-4" />
                    <span>{Math.floor(Math.random() * 100)}</span>
                  </div>
                  <LikeButton
                    liked={
                      likedByMe.data?.find(
                        (q) => q.questionId == question.questionId,
                      )
                        ? true
                        : false
                    }
                    likes={question._count.QuestionLike ?? 0}
                    questionId={question.questionId}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="overflow-hidden border-l-4 border-l-primary/20"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 animate-pulse rounded-full" />
                  <Skeleton className="h-6 w-64 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="mt-4 flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <div className="flex w-full justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Enhanced Pagination */}
      {totalPages > 0 && !isFetching && (
        <div className="mt-8 pb-4 transition-all duration-500">
          <Pagination className="rounded-xl border border-primary/20 p-2 shadow-sm">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                 
                />
              </PaginationItem>
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {isFetching && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary drop-shadow-lg" />
        </div>
      )}
    </div>
  );
};
