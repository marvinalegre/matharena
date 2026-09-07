import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUsername } from "@/lib/users";
import { HomePage } from "@/pages/HomePage";

export const homeRoutes = new Hono<AppEnv>();

homeRoutes.get("/", async (c) => {
  return c.html(
    <HomePage username={await getUsername(c.env.DB, c.get("user")?.userId)} />,
  );
});
