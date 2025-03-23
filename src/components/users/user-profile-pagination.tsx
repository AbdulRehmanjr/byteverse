"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, MessageCircle, Star, Eye } from "lucide-react";
import dayjs from "dayjs";

interface Question {
  questionId: string;
  title: string;
  content: string;
  createdAt: Date;
  tags: string[];
  _count?: {
    Answer: number;
    QuestionLike: number;
  };
}

interface QuestionsPaginationProps {
  questions: Question[];
  questionsPerPage?: number;
}

export const QuestionsPagination = ({ 
  questions, 
  questionsPerPage = 3 
}: QuestionsPaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (validPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const paginatedQuestions = questions.slice(startIndex, endIndex);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-primary">Questions ({totalQuestions})</h2>
        {totalPages > 1 && (
          <div className="text-sm text-muted-foreground">
            Page {validPage} of {totalPages}
          </div>
        )}
      </div>
      {totalQuestions > 0 ? (
        <>
          <div className="space-y-4">
            {paginatedQuestions.map((question) => (
              <Card key={question.questionId} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-2">
                  <Link 
                    href={`/questions/${question.questionId}`}
                    className="font-heading text-lg font-semibold hover:text-primary hover:underline"
                  >
                    {question.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{dayjs(question.createdAt).format('DD MMM YYYY')}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="font-text line-clamp-2 text-sm text-muted-foreground">
                    {question.content}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {question?.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="px-2 py-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="flex justify-between border-t bg-muted/50 p-2">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center">
                      <MessageCircle className="mr-1 h-3 w-3" />
                      <span>{question._count?.Answer ?? 0} answers</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      <span>{question._count?.QuestionLike ?? 0} likes</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      <span>0 views</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/questions/${question.questionId}`}>
                      View Question
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={validPage === 1}
                onClick={() => setCurrentPage(validPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-1">Previous</span>
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrentPage = pageNum === validPage;  
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= validPage - 1 && pageNum <= validPage + 1) ||
                    (validPage <= 3 && pageNum <= 4) ||
                    (validPage >= totalPages - 2 && pageNum >= totalPages - 3)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={isCurrentPage ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  if (
                    (pageNum === 2 && validPage > 4) ||
                    (pageNum === totalPages - 1 && validPage < totalPages - 3)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 pointer-events-none"
                        disabled
                      >
                        ...
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={validPage === totalPages}
                onClick={() => setCurrentPage(validPage + 1)}
              >
                <span className="mr-1">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="mb-4 text-muted-foreground">This user hasn&apos;t asked any questions yet.</p>
          <Button asChild>
            <Link href="/questions/ask">Ask a Question</Link>
          </Button>
        </div>
      )}
    </>
  );
}