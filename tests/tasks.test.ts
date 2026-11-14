import { getTaskRoute } from "../api/src/tasks";

test("returns 404 when the task does not exist", async () => {
  const id = "missing";

  const res = await getTaskRoute(id);

  expect(res.status).toBe(404);
  expect(res.body).toEqual({ error: { code: "not_found", message: "Task not found" } });
});

test("returns 400 when the task id is empty", async () => {
  const id = "";

  const res = await getTaskRoute(id);

  expect(res.status).toBe(400);
  expect(res.body).toEqual({ error: { code: "bad_input", message: "Task id is required" } });
});
