"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Clock, Tag, Eye, Loader2 } from "lucide-react";
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

export const QuestionList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  // Get total count for pagination using suspense
  const [totalCount] = api.question.getQuestionCount.useSuspenseQuery();

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
    <div className="space-y-4">
      {questions.map((question) => (
        <Card
          key={question.questionId}
          className="transition-shadow hover:shadow-md"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-primary hover:underline">
                <Link href={`/questions/${question.questionId}`}>{question.title}</Link>
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{dayjs(question.createdAt).format("DD.MM.YYYY")}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-4 line-clamp-3 text-muted-foreground">
              {parseHtml(question.content)}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>{0}</span>
                </div>
                <LikeButton
                  likes={question._count.QuestionLike ?? 0}
                  questionId={question.questionId}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* ShadCN Pagination Component */}
      {totalPages > 0 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {/* Show first page */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show previous page if not on first page */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Current page */}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>

            {/* Show next page if not on last page */}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show last page if not current and not adjacent */}
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
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {isFetching && currentPage !== 1 && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};
