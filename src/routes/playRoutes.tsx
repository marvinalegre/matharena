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
  const questionCode = c.req.query("question");

  let question;
  let formattedQuestion;

  if (questionCode) {
    if (!(questionCode in QUESTIONS)) {
      return c.notFound();
    }

    question = forge(questionCode);
    formattedQuestion = formatQuestion(questionCode, question.data);

    return c.html(
      <PlayPage
        question={formattedQuestion}
        correctAnswer={String(question.answer)}
      />,
    );
  }

  const user = c.get("user");
  if (!user) {
    const randomQuestionCode = getRandomQuestionCode();
    question = forge(randomQuestionCode);
    formattedQuestion = formatQuestion(randomQuestionCode, question.data);

    return c.html(
      <PlayPage
        question={formattedQuestion}
        correctAnswer={String(question.answer)}
        questionCode={
          randomQuestionCode in QUESTIONS ? randomQuestionCode : undefined
        }
      />,
    );
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

  return c.html(
    <PlayPage
      question={formatQuestion(currentQuestion.code, currentQuestion.data)}
      rating={await getRatingDisplay(
        c.env.DB,
        user.userId,
        currentQuestion.code,
      )}
      questionCode={
        currentQuestion.code in QUESTIONS ? currentQuestion.code : undefined
      }
    />,
  );
});

playRoutes.post("/", async (c) => {
  const questionCode = c.req.header("Referer")
    ? new URL(c.req.header("Referer")!).searchParams.get("question")
    : null;
  const user = c.get("user");
  const body = await c.req.parseBody();
  const answer = body.answer;
  const correctAnswer = body.correctAnswer;
  if (typeof answer !== "string") {
    throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
  }

  if (questionCode) {
    if (!(questionCode in QUESTIONS)) {
      throw new Error("BOOOOOOOOOOOOOOMMMMMMMM!!!");
    }

    const question = forge(questionCode);
    const formattedQuestion = formatQuestion(questionCode, question.data);

    return c.html(
      <QuestionForm
        question={formattedQuestion}
        correctAnswer={String(question.answer)}
      />,
      200,
      {
        "FX-Trigger": JSON.stringify({
          showToast: answer === correctAnswer ? "correct" : "wrong",
        }),
      },
    );
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
        correctAnswer={String(question.answer)}
        questionCode={
          randomQuestionCode in QUESTIONS ? randomQuestionCode : undefined
        }
      />,
      200,
      {
        "FX-Trigger": JSON.stringify({
          showToast: answer === correctAnswer ? "correct" : "wrong",
        }),
      },
    );
  }

  const rateLimit = await c.env.ANSWER_LIMITER.limit({
    key: String(user.userId),
  });
  if (!rateLimit.success) {
    return c.html("<p>Too many requests</p>", 429);
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
        questionCode={
          newQuestion.code in QUESTIONS ? newQuestion.code : undefined
        }
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
    case "addition-single-double-digit-under-20":
    case "addition-double-digit-under-100":
      return <p>{String.raw`\[${data.a} + ${data.b} = \; ?\]`}</p>;

    case "subtraction-single-digit-no-borrow":
    case "subtraction-double-single-digit-under-20":
    case "subtraction-double-digit-under-100":
      return <p>{String.raw`\[${data.a} - ${data.b} = \; ?\]`}</p>;

    case "count-10-random-dots":
    case "count-20-random-dots":
    case "count-20-50-dots-in-columns":
      return (
        <>
          <p class="text-center">Count the dots.</p>
          <Dots dots={data.dots} />
        </>
      );

    case "ordinal-before-after-10":
      return (
        <p class="text-center my-3">
          What comes {data.direction === 1 ? "after" : "before"}{" "}
          {String.raw`\(${ordinal(data.n)}\)`}?
        </p>
      );
    case "place-value-2-digit":
      return (
        <p class="text-center my-3">
          What is the place value of {String.raw`\(${data.digit}\)`} in{" "}
          {String.raw`\(${data.number}\)`}?
        </p>
      );

    case "count-coins-20":
      return (
        <BerryCoins ones={data.ones} fives={data.fives} tens={data.tens} />
      );

    case "count-money-100":
      return (
        <BerryMoney
          ones={data.ones}
          fives={data.fives}
          tens={data.tens}
          fifties={data.fifties}
        />
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

function ordinal(n: number) {
  const suffix =
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : ["th", "st", "nd", "rd"][n % 10] || "th";

  return `${n}${suffix}`;
}

type BerryCoinsProps = {
  ones: number;
  fives: number;
  tens: number;
};

function BerryCoins({ ones, fives, tens }: BerryCoinsProps) {
  const coins = [
    ...Array(ones).fill(1),
    ...Array(fives).fill(5),
    ...Array(tens).fill(10),
  ];

  return (
    <div class="berry-coins">
      <div class="info">
        <h3>Berry Coins</h3>
        <p class="subtitle">
          Each coin is worth a different number of berries.
        </p>

        <div class="coin-legend">
          <div class="legend-item">
            <div class="coin coin-1">1</div>
            <span>1 berry</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-5">5</div>
            <span>5 berries</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-10">10</div>
            <span>10 berries</span>
          </div>
        </div>
      </div>

      <div class="coins">
        {coins.map((value) => (
          <div class={`coin coin-${value}`}>{value}</div>
        ))}
      </div>

      <p class="text-center">How many berries is that?</p>
    </div>
  );
}

type BerryMoneyProps = {
  ones: number;
  fives: number;
  tens: number;
  fifties: number;
};

function BerryMoney({ ones, fives, tens, fifties }: BerryMoneyProps) {
  const coins = [
    ...Array(ones).fill(1),
    ...Array(fives).fill(5),
    ...Array(tens).fill(10),
    ...Array(fifties).fill(50),
  ];

  return (
    <div class="berry-coins">
      <div class="info">
        <h3>Berry Money</h3>
        <p class="subtitle">
          Each coin and bill is worth a different number of berries.
        </p>

        <div class="money-legend">
          <div class="legend-item">
            <div class="coin coin-1">1</div>
            <span>1 berry</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-5">5</div>
            <span>5 berries</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-10">10</div>
            <span>10 berries</span>
          </div>

          <div class="legend-item">
            <div class="bill">50</div>
            <span>50 berries</span>
          </div>
        </div>
      </div>

      <div class="coins">
        {coins.map((value) => {
          if (value === 50) {
            return <div class={`bill`}>{value}</div>;
          }
          return <div class={`coin coin-${value}`}>{value}</div>;
        })}
      </div>

      <p class="text-center">How many berries is that?</p>
    </div>
  );
}
