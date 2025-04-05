import { CreateSnippetForm } from "~/components/snippets/snippet-create";


export const metadata = {
  title: "Create Code Snippet",
  description: "Share your code with the community",
};

export default function CreateSnippetPage() {
  return (
    <div className="mx-6 grid gap-2 p-3">
      <CreateSnippetForm />
    </div>
  );
}