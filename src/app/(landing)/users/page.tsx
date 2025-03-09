import { UserFilter } from "~/components/users/user-filter";
import { UserList } from "~/components/users/user-list";
import { UserStats } from "~/components/users/user-stats";

export default function UsersPage() {
  return (
    <section className="mx-6 grid gap-2 p-3">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary font-heading">Developer Community</h1>
        <p className="mt-2 text-muted-foreground font-text">
          Connect with developers, ask questions, and share knowledge
        </p>
      </div>
      <UserFilter/>
      <UserStats/>
      <UserList/>
    </section>
  );
}
