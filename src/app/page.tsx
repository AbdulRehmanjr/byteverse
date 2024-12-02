import { TaskForm } from "~/components/general/task-creation";
import { TaskList } from "~/components/general/task-list";

export default function HomePage() {
  return (
    <main className="grid h-screen place-content-center">
      <TaskForm />
      <TaskList/>
    </main>
  );
}
