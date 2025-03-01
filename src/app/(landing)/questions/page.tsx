import Link from "next/link";
import { QuestionList } from "~/components/questions/question-list";
import { Button } from "~/components/ui/button";

export default function QuestionsPage() {
  return (
    <section className="mx-6 grid gap-2 p-3">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-primary">Newest Questions</h1>
        <Button type="button" asChild>
          <Link href="/questions/ask">Ask Question</Link>
        </Button>
      </div>
      <QuestionList/>
    </section>
  );
}
