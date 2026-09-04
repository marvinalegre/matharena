import { Hono } from "hono";

import { forge } from "mathforge";
import type { AppEnv } from "@/types/env";
import { SUPPORTED_QUESTIONS } from "@/lib/supportedQuestions";
import { PlayPage } from "@/pages/PlayPage";
import { QuestionForm } from "@/components/QuestionForm";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", (c) => {
  const randomQuestionCode =
    SUPPORTED_QUESTIONS[Math.floor(Math.random() * SUPPORTED_QUESTIONS.length)];
  const question = forge(randomQuestionCode);
  const formattedQuestion = formatQuestion(randomQuestionCode, question.data);

  if (!c.get("user")) {
    return c.html(
      <PlayPage
        question={formattedQuestion}
        answer={String(question.answer)}
      />,
    );
  } else {
    return c.html(<PlayPage question={formattedQuestion} />);
  }
});

playRoutes.post("/", async (c) => {
  const body = await c.req.parseBody();
  const answer = body.answer;
  if (typeof answer !== "string") {
    throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
  }

  if (!c.get("user")) {
    const correctAnswer = body.correctAnswer;
    if (typeof correctAnswer !== "string") {
      throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
    }

    const randomQuestionCode =
      SUPPORTED_QUESTIONS[
        Math.floor(Math.random() * SUPPORTED_QUESTIONS.length)
      ];
    const question = forge(randomQuestionCode);
    const formattedQuestion = formatQuestion(randomQuestionCode, question.data);

    return c.html(
      <QuestionForm
        question={formattedQuestion}
        answer={String(question.answer)}
      />,
      200,
      {
        "FX-Trigger": JSON.stringify({
          showToast: answer === correctAnswer ? "correct" : "wrong",
        }),
      },
    );
  }

  return c.text("boo");
});

function formatQuestion(code: string, data: any) {
  switch (code) {
    case "addition-single-digit-no-carry":
    case "addition-single-digit-carry":
      return `\\[${data.a} + ${data.b} = \\; ?\\]`;
  }

  throw new Error("Formatter: Invalid question code");
}
