import { CounterButton } from "~/components/general/counter-button";
import { TaskForm } from "~/components/general/task-creation";

export default function HomePage() {
  return (
    <main className="grid h-screen place-content-center">
      <TaskForm></TaskForm>
    </main>
  );
}
