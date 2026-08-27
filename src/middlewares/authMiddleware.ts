import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";

import type { AppEnv } from "@/types/env";

export const authMiddleware = () =>
  createMiddleware<AppEnv>(async (c, next) => {
    const sessionId = getCookie(c, "session");
    const user =
      sessionId &&
      (await c.env.KV.get<{ userId: number }>(`session:${sessionId}`, "json"));

    if (user) c.set("user", user);

    await next();
  });
