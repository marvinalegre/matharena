import { Hono } from "hono";

import { forge } from "mathforge";
import type { AppEnv } from "@/types/env";
import { PlayPage } from "@/pages/PlayPage";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", (c) => {
  const question = forge("addition-single-digit-no-carry");
  console.log(question);
  const formattedQuestion = formatQuestion(
    "addition-single-digit-no-carry",
    question.data,
  );
  console.log(formattedQuestion);

  return c.html(<PlayPage question={formattedQuestion} />);
});

function formatQuestion(code: string, data: any) {
  switch (code) {
    case "addition-single-digit-no-carry":
      return `\\[${data.a} + ${data.b} = \\; ?\\]`;
  }
}
