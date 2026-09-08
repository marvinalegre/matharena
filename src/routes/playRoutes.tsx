import { Hono } from "hono";

import { forge } from "mathforge";
import type { AppEnv } from "@/types/env";
import { SUPPORTED_QUESTIONS } from "@/lib/supportedQuestions";
import { PlayPage } from "@/pages/PlayPage";
import { RatingDisplay } from "@/components/RatingDisplay";
import { QuestionForm } from "@/components/QuestionForm";
import { getRatingDisplay, newRating } from "@/lib/rating";
import { getCookie } from "hono/cookie";
import { updateUserRating } from "@/lib/users";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", async (c) => {
  const randomQuestionCode =
    SUPPORTED_QUESTIONS[Math.floor(Math.random() * SUPPORTED_QUESTIONS.length)];
  const question = forge(randomQuestionCode);
  const formattedQuestion = formatQuestion(randomQuestionCode, question.data);

  const user = c.get("user");
  let props;

  if (!user) {
    props = {
      question: formattedQuestion,
      answer: question.answer,
    };
    return c.html(<PlayPage {...props} />);
  }

  const sessionId = getCookie(c, "session") as string;
  let currentQuestion = await getCurrentQuestion(c.env.KV, sessionId);
  currentQuestion =
    currentQuestion ?? (await createAndStoreQuestion(c.env.KV, sessionId));

  props = {
    question: formatQuestion(currentQuestion.code, currentQuestion.data),
    rating: await getRatingDisplay(c.env.DB, user.userId, randomQuestionCode),
  };

  return c.html(<PlayPage {...props} />);
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

  const user = c.get("user");
  const sessionId = getCookie(c, "session") as string;
  const currentQuestion = (await getCurrentQuestion(
    c.env.KV,
    sessionId,
  )) as CurrentQuestion;
  const newQuestion = await createAndStoreQuestion(c.env.KV, sessionId);

  const questionRating = (await c.env.DB.prepare(
    "select rating from questions where code = ?",
  )
    .bind(currentQuestion.code)
    .first()) as { rating: number };
  const userRating = (await c.env.DB.prepare(
    "select rating from users where id = ?",
  )
    .bind(user.userId)
    .first()) as { rating: number };
  const isCorrect = answer === String(currentQuestion.answer);

  await updateUserRating(
    c.env.DB,
    user.userId,
    newRating(userRating.rating, isCorrect ? 1 : 0, questionRating.rating),
  );

  const rating = await getRatingDisplay(
    c.env.DB,
    user.userId,
    newQuestion.code,
  );

  return c.html(
    <div id="target">
      <RatingDisplay
        rating={rating.current}
        correctChange={rating.correct}
        incorrectChange={rating.incorrect}
      />

      <QuestionForm
        question={formatQuestion(newQuestion.code, newQuestion.data)}
      />
    </div>,
    200,
    {
      "FX-Trigger": JSON.stringify({
        showToast: isCorrect ? "correct" : "wrong",
      }),
    },
  );
});

function formatQuestion(code: string, data: any) {
  switch (code) {
    case "addition-single-digit-no-carry":
    case "addition-single-digit-carry":
      return `\\[${data.a} + ${data.b} = \\; ?\\]`;
  }

  throw new Error("Formatter: Invalid question code");
}

interface CurrentQuestion {
  code: string;
  data: any;
  answer: string;
}

function getRandomQuestionCode() {
  return SUPPORTED_QUESTIONS[
    Math.floor(Math.random() * SUPPORTED_QUESTIONS.length)
  ];
}

async function getCurrentQuestion(kv: KVNamespace, sessionId: string) {
  return kv.get<CurrentQuestion>(`current-question:${sessionId}`, "json");
}

async function createAndStoreQuestion(kv: KVNamespace, sessionId: string) {
  const code = getRandomQuestionCode();
  const question = forge(code);

  const currentQuestion = {
    code,
    data: question.data,
    answer: question.answer,
  };

  await kv.put(
    `current-question:${sessionId}`,
    JSON.stringify(currentQuestion),
  );

  return currentQuestion;
}
