import { getTaskRoute } from "../api/src/tasks";

test("returns 404 when the task does not exist", async () => {
  const id = "missing";

  const res = await getTaskRoute(id);

  expect(res.status).toBe(404);
});

test("returns 400 when the task id is empty", async () => {
  const id = "";

  const res = await getTaskRoute(id);

  expect(res.status).toBe(400);
});
