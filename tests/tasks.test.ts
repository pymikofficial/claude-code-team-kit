import { getTaskRoute } from "../api/src/tasks";

test("returns 404 when the task does not exist", async () => {
  const id = "missing";

  const res = await getTaskRoute(id);

  expect(res.status).toBe(404);
});
