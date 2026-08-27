import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";

export const logoutRoutes = new Hono<{ Bindings: Env }>();

logoutRoutes.post("/", async (c) => {
  // TODO: use session from context instead (from an authmiddleware)
  const sessionId = getCookie(c, "session");

  await c.env.KV.delete(`session:${sessionId}`);

  deleteCookie(c, "session");

  return c.newResponse(null, 200, {
    "FX-Redirect": "/",
  });
});
