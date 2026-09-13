import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { QUESTIONS } from "@/lib/questions";
import { QuestionsPage } from "@/pages/QuestionsPage";

export const questionsRoutes = new Hono<AppEnv>();

questionsRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);

  return c.html(
    <QuestionsPage username={user?.username} questions={QUESTIONS} />,
  );
});
