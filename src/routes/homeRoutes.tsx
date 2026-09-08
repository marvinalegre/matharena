import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { HomePage } from "@/pages/HomePage";

export const homeRoutes = new Hono<AppEnv>();

homeRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  return c.html(<HomePage username={user?.username} />);
});
