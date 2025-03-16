import { Suspense } from "react";
import { UserListSkeleton } from "~/components/skeletons/user-list";
import { UserFilter } from "~/components/users/user-filter";
import { UserList } from "~/components/users/user-list";
import { UserStats } from "~/components/users/user-stats";

export default function UsersPage() {
  return (
    <section className="mx-6 grid gap-2 p-3">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Developer Community
        </h1>
        <p className="mt-2 font-text text-muted-foreground">
          Connect with developers, ask questions, and share knowledge
        </p>
      </div>
      <UserFilter />
      <UserStats />
      <Suspense fallback={  <UserListSkeleton/>}>
        <UserList />
      </Suspense>
    </section>
  );
}
