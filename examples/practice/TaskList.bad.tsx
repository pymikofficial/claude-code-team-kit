// Practice file for the /review-change skill. It breaks two team rules on purpose.
// Copy it over frontend/src/TaskList.tsx, run /review-change, then restore the original.
type Task = { id: string; title: string; done: boolean };

export function TaskList({ tasks, onRemove }: { tasks: Task[]; onRemove: (id: string) => void }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;
  // const doneTasks = tasks.filter((task) => task.done);
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.done ? "Done" : "Open"}, {task.title}
          <button onClick={() => onRemove(task.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
