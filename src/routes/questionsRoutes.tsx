import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { QuestionsPage } from "@/pages/QuestionsPage";

export const questionsRoutes = new Hono<AppEnv>();

questionsRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);

  const questions = [
    {
      code: "addition-single-digit-no-carry",
      title: "Addition Without Carrying",
      description: "Add two single-digit numbers without carrying.",
      examples: [
        { question: "3 + 4", answer: "7" },
        { question: "2 + 6", answer: "8" },
        { question: "5 + 3", answer: "8" },
      ],
    },
    {
      code: "multiplication-single-digit",
      title: "Single-Digit Multiplication",
      description: "Multiply two single-digit numbers.",
      examples: [
        { question: "3 × 4", answer: "12" },
        { question: "7 × 6", answer: "42" },
        { question: "8 × 9", answer: "72" },
      ],
    },
  ];
  return c.html(
    <QuestionsPage username={user?.username} questions={questions} />,
  );
});
