import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { FeedbackPage } from "@/pages/FeedbackPage";

export const feedbackRoutes = new Hono<AppEnv>();

feedbackRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  return c.html(<FeedbackPage username={user?.username} />);
});
