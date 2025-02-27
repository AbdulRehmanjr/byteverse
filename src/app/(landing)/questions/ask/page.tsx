import { Card, CardContent } from "~/components/ui/card";
import {
  PencilLine,
  FileText,
  SearchCode,
  Tags,
  CheckCircle,
  BookOpen,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { AskQuestionForm } from "~/components/questions/ask/question-form";

export default function QuestionsPage() {
  return (
    <section className="mx-6 grid gap-2 p-3">
      <div className="mb-4 grid gap-4">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Ask a question
        </h1>
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="space-y-3 p-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-2xl font-medium text-primary">
                  Writing a good question
                </h2>
              </div>

              <div className="ml-8 space-y-2 border-l-2 border-blue-200 pl-4">
                <p className="font-text text-gray-700">
                  You&apos;re ready to{" "}
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    ask a programming-related question
                    <HelpCircle className="ml-1 h-4 w-4" />
                  </a>{" "}
                  and this form will help guide you through the process.
                </p>
                <p className="font-text text-gray-700">
                  Looking to ask a non-programming question? See{" "}
                  <a
                    href="#"
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    the topics here
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>{" "}
                  to find a relevant site.
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 border-b pb-2">
                <SearchCode className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-medium text-gray-800">
                  Steps to a Great Question
                </h3>
              </div>

              <ul className="space-y-1 font-text">
                <li className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-blue-50">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1.5 text-primary group-hover:bg-blue-200">
                    <PencilLine className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium text-primary">Summarize</span>{" "}
                    your problem in a one-line title.
                  </span>
                </li>

                <li className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-blue-50">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1.5 text-primary group-hover:bg-blue-200">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium text-primary">Describe</span>{" "}
                    your problem in more detail.
                  </span>
                </li>

                <li className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-blue-50">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1.5 text-primary group-hover:bg-blue-200">
                    <SearchCode className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium text-primary">Explain</span>{" "}
                    what you tried and what you expected to happen.
                  </span>
                </li>

                <li className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-blue-50">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1.5 text-primary group-hover:bg-blue-200">
                    <Tags className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium text-primary">Add tags</span>{" "}
                    which help surface your question to members of the
                    community.
                  </span>
                </li>

                <li className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-blue-50">
                  <div className="mt-0.5 flex-shrink-0 rounded-full bg-blue-100 p-1.5 text-primary group-hover:bg-blue-200">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span className="text-gray-700">
                    <span className="font-medium text-primary">Review</span>{" "}
                    your question and post it to the site.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <AskQuestionForm />
    </section>
  );
}
