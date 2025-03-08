import {
  ArrowLeft,
  Tag,
  MessageCircle,
  Clock,
  Heart,
  Eye,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ResponseList } from "~/components/questions/answer/answer-list";
import { ShareButton } from "~/components/questions/share-button";
import { BookmarkButton } from "~/components/questions/bookmark-question";

type PageProps = {
  params: Promise<{ questionId: string }>;
};

export default async function QuestionsDetailPage({ params }: PageProps) {
  const paramProps = await params;
  const question = await api.question.getQuestionById({
    questionId: paramProps.questionId,
  });

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="group mb-6 transition-all duration-300 hover:-translate-x-1"
        >
          <Link
            href="/questions"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Questions
          </Link>
        </Button>

        <Card className="overflow-hidden border-l-4 border-l-primary/50 shadow-lg">
          <CardHeader className="border-b bg-gray-50 pb-4 dark:bg-gray-900">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <h1 className="font-heading text-3xl font-bold text-primary">
                  {question.title}
                </h1>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BookmarkButton questionId={question.questionId}/>
                      </TooltipTrigger>
                      <TooltipContent>Save for later</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ShareButton questionId={paramProps.questionId} />
                      </TooltipTrigger>
                      <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 ring-2 ring-primary/30 ring-offset-1">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${question.user.email}.png`}
                    />
                    <AvatarFallback>
                      {question.user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-primary">
                    {question.user.email.split("@")[0]}
                  </span>
                </div>

                <Separator orientation="vertical" className="h-4" />

                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {dayjs(question.createdAt).format("DD.MM.YYYY")}
                </span>

                <Separator orientation="vertical" className="h-4" />

                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-primary" />
                  {question._count.QuestionLike ?? 0} likes
                </span>

                <Separator orientation="vertical" className="h-4" />

                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {Math.floor(Math.random() * 200) + 10} views
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6 pt-8">
            <div className="prose prose-lg dark:prose-invert prose-headings:text-primary prose-a:text-primary max-w-none">
              {parseHtml(question.content)}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="default"
                  className="flex items-center bg-primary shadow-sm transition-all duration-300 hover:bg-primary/90"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-gray-50 py-4 dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20 ring-offset-2">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${question.user.email}.png`}
                />
                <AvatarFallback>
                  {question.user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium text-gray-950 dark:text-gray-100">
                  {question.user.email.split("@")[0]}
                </div>
                <div className="text-muted-foreground">
                  Member since{" "}
                  {dayjs()
                    .subtract(Math.floor(Math.random() * 365) + 1, "days")
                    .format("MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2 hover:bg-primary/5">
                <Heart className="h-4 w-4 text-primary" />
                <span>{question._count.QuestionLike ?? 0}</span>
              </Button>
              <Button variant="outline" className="gap-2 hover:bg-primary/5">
                <MessageCircle className="h-4 w-4" />
                Reply
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <ResponseList questionId={paramProps.questionId} />
    </section>
  );
}
