import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { HomePage } from "@/pages/HomePage";

export const homeRoutes = new Hono<AppEnv>();

homeRoutes.get("/", (c) => {
  return c.html(<HomePage user={c.get("user")} />);
});
