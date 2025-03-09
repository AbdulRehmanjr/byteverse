"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Clock, MessageCircle, Bookmark } from "lucide-react";
import dayjs from "dayjs";
import { parseHtml } from "~/lib/utils";
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
import { cn } from "~/lib/utils";

export const BookmarkList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;
  const skip = (currentPage - 1) * limit;

  const [data] = api.question.getAllBookmarks.useSuspenseQuery({
    limit,
    skip,
  });

  const bookmarks = data || [];
  const totalCount = bookmarks.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center space-y-4 rounded-xl bg-gradient-to-b from-gray-50 to-white p-6 text-center dark:from-gray-950 dark:to-gray-900">
        <Bookmark className="h-16 w-16 text-primary/50" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          No bookmarks yet
        </h2>
        <p className="text-muted-foreground">
          Start browsing questions and save them to view later
        </p>
        <Button asChild>
          <Link href="/questions">Browse Questions</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl bg-gradient-to-b from-gray-50 to-white p-6 py-4 transition-all duration-500 dark:from-gray-950 dark:to-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">My Bookmarks</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/questions">
            <Bookmark className="mr-2 h-4 w-4" />
            Browse Questions
          </Link>
        </Button>
      </div>

      <div className="space-y-6 transition-all duration-500">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.saveId}
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
                        src={`https://avatar.vercel.sh/${bookmark.questionId}.png`}
                      />
                      <AvatarFallback>
                        {bookmark.question.title.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl font-bold text-primary hover:underline group-hover:to-primary">
                      <Link href={`/questions/${bookmark.questionId}`}>
                        {bookmark.question.title}
                      </Link>
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {dayjs(bookmark.createdAt).format("DD.MM.YYYY")}
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
                  {parseHtml(bookmark.question.content)}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t bg-gray-50 bg-opacity-50 pt-3 backdrop-blur-sm transition-all duration-300 dark:bg-gray-900">
                <div className="flex items-center gap-2 text-sm">
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link href={`/questions/${bookmark.questionId}`}>
                      <MessageCircle className="h-4 w-4" />
                      <span>View Question</span>
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
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
                  <PaginationLink onClick={() => handlePageChange(1)}>
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
    </div>
  );
};
