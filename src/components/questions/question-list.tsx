"use client";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Clock, Tag, Eye, ThumbsUp } from "lucide-react";
import dayjs from "dayjs";
import { parseHtml } from "~/lib/utils";
import { LikeButton } from "./like-button";

export const QuestionList = () => {
  const [questions] = api.question.getAllQuestions.useSuspenseQuery();
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card
          key={question.questionId}
          className="transition-shadow hover:shadow-md"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-primary">
                {question.title}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {/* <span>{formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</span> */}
                <span>{dayjs().format("DD/MM/YYYY")}</span>
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
                  {/* <span>{question.views || 0}</span> */}
                  <span>0</span>
                </div>
                <LikeButton />
              </div>
            </div>
          </CardContent>

          {/* <CardFooter className="border-t pt-0">
            <div className="flex items-center">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage
                  src={question.author?.image || ""}
                  alt={question.author?.name || "User"}
                />
                <AvatarFallback>
                  {(question.author?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {question.author?.name || "Anonymous"}
              </span>
            </div>
          </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};
