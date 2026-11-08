// In-memory stand-in for a database, enough for the sample.
type Task = { id: string; title: string; dueDate: string; done: boolean };

const tasks: Task[] = [
  { id: "1", title: "Send weekly report", dueDate: "2026-11-13", done: false },
];

export async function getTask(id: string): Promise<Task | undefined> {
  return tasks.find((t) => t.id === id);
}
