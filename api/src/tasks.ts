// Sample route so the API rules have something to apply to.
import { getTask } from "./db";

export async function getTaskRoute(id: string) {
  if (!id) {
    return { status: 400, body: { error: { code: "bad_input", message: "Task id is required" } } };
  }
  const task = await getTask(id);
  if (!task) {
    return { status: 404, body: { error: { code: "not_found", message: "Task not found" } } };
  }
  return { status: 200, body: { data: task } };
}
