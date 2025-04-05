import { SnippetList } from "~/components/snippets/snippet-list";

export const metadata = {
  title: "Code Snippets",
  description: "Browse and share code snippets with the community",
};

export default function SnippetsPage() {
  return (
    <section className="mx-6 grid gap-2 p-3">
      <SnippetList />
    </section>
  );
}