import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { forge } from "mathforge";

import type { AppEnv } from "@/types/env";
import { SUPPORTED_QUESTIONS } from "@/lib/supportedQuestions";
import { QUESTIONS } from "@/lib/questions";
import { PlayPage } from "@/pages/PlayPage";
import { RatingDisplay } from "@/components/RatingDisplay";
import { QuestionForm } from "@/components/QuestionForm";
import { getRatingDisplay, newRating } from "@/lib/rating";
import { getUser, updateUserRating } from "@/lib/users";
import { LeaderboardUser } from "@/pages/LeaderboardPage";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", async (c) => {
  const code = c.req.query("question");

  let question;
  let formattedQuestion;
  let props;

  if (code) {
    if (!(code in QUESTIONS)) {
      return c.notFound();
    }

    question = forge(code);
    formattedQuestion = formatQuestion(code, question.data);

    props = {
      question: formattedQuestion,
      answer: question.answer,
    };
    return c.html(<PlayPage {...props} />);
  }

  const randomQuestionCode = getRandomQuestionCode();
  question = forge(randomQuestionCode);
  formattedQuestion = formatQuestion(randomQuestionCode, question.data);
  const user = c.get("user");

  if (!user) {
    props = {
      question: formattedQuestion,
      answer: question.answer,
      code: randomQuestionCode in QUESTIONS ? randomQuestionCode : undefined,
    };
    return c.html(<PlayPage {...props} />);
  }

  const userWithRating = (await getUser(
    c.env.DB,
    user.userId,
  )) as LeaderboardUser;
  const sessionId = getCookie(c, "session") as string;
  let currentQuestion = await getCurrentQuestion(c.env.KV, sessionId);
  currentQuestion =
    currentQuestion ??
    (await createAndStoreQuestion(
      c.env.KV,
      c.env.DB,
      userWithRating.rating,
      sessionId,
    ));

  props = {
    question: formatQuestion(currentQuestion.code, currentQuestion.data),
    rating: await getRatingDisplay(c.env.DB, user.userId, randomQuestionCode),
    code: currentQuestion.code in QUESTIONS ? currentQuestion.code : undefined,
  };

  return c.html(<PlayPage {...props} />);
});

playRoutes.post("/", async (c) => {
  const user = c.get("user");
  const body = await c.req.parseBody();
  const answer = body.answer;
  const correctAnswer = body.correctAnswer;
  if (typeof answer !== "string") {
    throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
  }

  if (!user) {
    if (typeof correctAnswer !== "string") {
      throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
    }

    const randomQuestionCode = getRandomQuestionCode();
    const question = forge(randomQuestionCode);
    const formattedQuestion = formatQuestion(randomQuestionCode, question.data);

    return c.html(
      <QuestionForm
        question={formattedQuestion}
        answer={String(question.answer)}
        code={randomQuestionCode in QUESTIONS ? randomQuestionCode : undefined}
      />,
      200,
      {
        "FX-Trigger": JSON.stringify({
          showToast: answer === correctAnswer ? "correct" : "wrong",
        }),
      },
    );
  }

  const sessionId = getCookie(c, "session") as string;
  const currentQuestion = (await getCurrentQuestion(
    c.env.KV,
    sessionId,
  )) as CurrentQuestion;
  const isCorrect = answer === String(currentQuestion.answer);

  // TODO: use Promise.all or turn to one big query
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
  await updateUserRating(
    c.env.DB,
    user.userId,
    newRating(userRating.rating, isCorrect ? 1 : 0, questionRating.rating),
  );
  await updateQuestionRating(
    c.env.DB,
    currentQuestion.code,
    newRating(questionRating.rating, isCorrect ? 0 : 1, userRating.rating),
  );

  const newQuestion = await createAndStoreQuestion(
    c.env.KV,
    c.env.DB,
    userRating.rating,
    sessionId,
  );
  const rating = await getRatingDisplay(
    c.env.DB,
    user.userId,
    newQuestion.code,
  );

  await c.env.DB.prepare(
    `
    insert into
      attempts (question_code, user_id, user_rating, is_correct)
    values
      (?, ?, ?, ?)
    `,
  )
    .bind(
      currentQuestion.code,
      user.userId,
      userRating.rating,
      isCorrect ? 1 : 0,
    )
    .run();

  return c.html(
    <div id="target">
      <RatingDisplay
        rating={rating.current}
        correctChange={rating.correct}
        incorrectChange={rating.incorrect}
      />

      <QuestionForm
        question={formatQuestion(newQuestion.code, newQuestion.data)}
        code={newQuestion.code in QUESTIONS ? newQuestion.code : undefined}
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

    case "count-10-random-dots":
    case "count-20-random-dots":
    case "count-20-50-dots-in-columns":
      return (
        <>
          <p class="text-center">Count the dots.</p>
          <Dots dots={data.dots} />
        </>
      );
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

async function createAndStoreQuestion(
  kv: KVNamespace,
  db: D1Database,
  userRating: number,
  sessionId: string,
) {
  const { results: questions } = await db
    .prepare("select code, rating from questions")
    .all<{ code: string; rating: number }>();
  const code = getClosestQuestionTypeCode(questions, userRating);
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

function getClosestQuestionTypeCode(
  questions: { code: string; rating: number }[],
  userRating: number,
) {
  const nearestDistance = Math.min(
    ...questions.map((q) => Math.abs(q.rating - userRating)),
  );

  const nearest = questions.filter(
    (q) => Math.abs(q.rating - userRating) === nearestDistance,
  );

  return nearest[Math.floor(Math.random() * nearest.length)].code;
}

export async function updateQuestionRating(
  db: D1Database,
  code: string,
  rating: number,
) {
  await db
    .prepare("UPDATE questions SET rating = ? WHERE code = ?")
    .bind(rating, code)
    .run();
}

type Dot = {
  x: number;
  y: number;
};

function Dots({ dots }: { dots: Dot[] }) {
  return (
    <div class="dots">
      {dots.map((dot) => (
        <span
          class="dot"
          style={`left: ${dot.x * 100}%; top: ${dot.y * 100}%`}
        />
      ))}
    </div>
  );
}
