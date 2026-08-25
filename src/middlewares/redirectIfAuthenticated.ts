import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";

export const redirectIfAuthenticated = (path: string) =>
  createMiddleware(async (c, next) => {
    const sessionId = getCookie(c, "session");
    const session =
      sessionId && (await c.env.KV.get(`session:${sessionId}`, "json"));
    if (session) return c.redirect(path);
    await next();
  });
