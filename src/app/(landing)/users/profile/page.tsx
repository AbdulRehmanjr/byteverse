import { ProfileForm } from "~/components/profile/create-form";
import { HydrateClient } from "~/trpc/server";

export default function ProfilePage() {
  return (
    <HydrateClient>
      <section className="mx-6 grid gap-2 p-3">
        <div className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-primary">
            Profile
          </h1>
          <p className="mt-2 font-text text-muted-foreground">
            Create your developer profile
          </p>
        </div>
        <ProfileForm />
      </section>
    </HydrateClient>
  );
}
