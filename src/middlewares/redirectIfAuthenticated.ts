import { createMiddleware } from "hono/factory";

import { AppEnv } from "@/types/env";

export const redirectIfAuthenticated = (path: string) =>
  createMiddleware<AppEnv>(async (c, next) => {
    const user = c.get("user");

    if (user) return c.redirect(path);

    await next();
  });
