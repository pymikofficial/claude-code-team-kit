// Sample component so the frontend rules have something to apply to.
type Task = { id: string; title: string; done: boolean };

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.done ? "Done" : "Open"}, {task.title}</li>
      ))}
    </ul>
  );
}
