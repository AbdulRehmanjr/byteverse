import { Bookmark } from "lucide-react";
import Link from "next/link";
import { BookmarkList } from "~/components/bookmarks/bookmark-list";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

export default async function BookmarkPage() {
  const session = await auth();
  if (!session)
    return <section className="mx-6 grid gap-2 p-3">
      <div className="flex h-80 flex-col items-center justify-center space-y-4 rounded-xl bg-gradient-to-b from-gray-50 to-white p-6 text-center dark:from-gray-950 dark:to-gray-900">
        <Bookmark className="h-16 w-16 text-primary/50" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Sign in to view your bookmarks
        </h2>
        <p className="text-muted-foreground">
          You need to be logged in to save and view bookmarks
        </p>
        <Button asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    </section>;
  else
    return (
      <section className="mx-6 grid gap-2 p-3">
        <BookmarkList />
      </section>
    );
}
