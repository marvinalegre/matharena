import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { QUESTIONS } from "@/lib/questions";
import { QuestionsPage } from "@/pages/QuestionsPage";
import { QuestionPage, type QuestionCode } from "@/pages/QuestionPage";

export const questionsRoutes = new Hono<AppEnv>();

questionsRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);

  return c.html(
    <QuestionsPage username={user?.username} questions={QUESTIONS} />,
  );
});

questionsRoutes.get("/:code", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  const code = c.req.param("code");
  if (!(code in QUESTIONS)) {
    return c.notFound();
  }
  return c.html(
    <QuestionPage username={user?.username} code={code as QuestionCode} />,
  );
});
