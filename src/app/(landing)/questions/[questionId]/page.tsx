
import { ArrowLeft, MessageSquare, Tag, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { parseHtml } from "~/lib/utils";
import { api } from "~/trpc/server";
import Link from "next/link";
import dayjs from "dayjs";

type PageProps = {
  params: Promise<{ questionId: string }>;
};

export default async function QuestionsDetailPage({ params }: PageProps) {
  const paramProps = await params;
  const question = await api.question.getQuestionById({
    questionId: paramProps.questionId,
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link
            href="/questions"
            className="flex items-center gap-1 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Questions
          </Link>
        </Button>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <h1 className="font-heading text-2xl font-bold text-primary">
                  {question.title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {question.user.email}
                </span>
                <span>
                  Posted on{" "}
                  {dayjs(question.createdAt).format('DD.MM.YYYY')}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {question._count.QuestionLike??0} likes
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="prose max-w-none">
              {parseHtml(question.content)}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
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
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-muted/10 py-4">
            {/* <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {question.user?.email.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">
                  {question.user?.email.split("@")[0] || "Anonymous"}
                </div>
                <div className="text-muted-foreground">Member</div>
              </div>
            </div> */}

            {/* <div className="flex items-center gap-4">
              <LikeButton likes={likeCount} questionId={question.questionId} />
            </div> */}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
