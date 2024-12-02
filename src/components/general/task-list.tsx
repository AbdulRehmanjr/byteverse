import { api } from "~/trpc/server";

export const TaskList = async () => {
  const tasks = await api.task.getTasks();
  return (
    <div className="grid gap-4 bg-gray-50 rounded-md shadow-lg my-6 p-2 border-2 border-green-500">
      {tasks.map((task, index) => (
        <div key={index} className="grid gap-2">
          <p>{task.title    }</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};
