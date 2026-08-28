import { Hono } from "hono";

import { forge } from "mathforge";
import type { AppEnv } from "@/types/env";
import { PlayPage } from "@/pages/PlayPage";
import { QuestionForm } from "@/components/QuestionForm";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", (c) => {
  const question = forge("addition-single-digit-no-carry");
  const formattedQuestion = formatQuestion(
    "addition-single-digit-no-carry",
    question.data,
  );

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

    const question = forge("addition-single-digit-no-carry");
    const formattedQuestion = formatQuestion(
      "addition-single-digit-no-carry",
      question.data,
    );

    return c.html(
      <QuestionForm
        question={formattedQuestion}
        answer={String(question.answer)}
      />,
      // TODO: is 200 the right status code to serve?
      200,
      // TODO: display at toast using this header
      { "MA-isCorrect": answer === correctAnswer ? "true" : "false" },
    );
  }

  return c.text("boo");
});

function formatQuestion(code: string, data: any) {
  switch (code) {
    case "addition-single-digit-no-carry":
      return `\\[${data.a} + ${data.b} = \\; ?\\]`;
  }

  throw new Error("Formatter: Invalid question code");
}
