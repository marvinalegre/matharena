const K = 16;

export function expectedScore(
  ownRating: number,
  opponentRating: number,
): number {
  return 1 / (1 + Math.pow(10, (opponentRating - ownRating) / 400));
}

export function newRating(
  oldRating: number,
  score: 0 | 1,
  opponentRating: number,
): number {
  return Math.round(
    oldRating + K * (score - expectedScore(oldRating, opponentRating)),
  );
}

export interface RatingDisplay {
  current: number;
  correct: number;
  incorrect: number;
}

export async function getRatingDisplay(
  db: D1Database,
  userId: number,
  questionCode: string,
): Promise<RatingDisplay> {
  const user = await db
    .prepare("SELECT rating FROM users WHERE id = ?")
    .bind(userId)
    .first<{ rating: number }>();
  const question = await db
    .prepare("SELECT rating FROM questions WHERE code = ?")
    .bind(questionCode)
    .first<{ rating: number }>();

  if (!user) {
    throw new Error("User not found");
  }
  if (!question) {
    throw new Error("Question not found");
  }

  return {
    current: user.rating,
    correct: newRating(user.rating, 1, question.rating) - user.rating,
    incorrect: newRating(user.rating, 0, question.rating) - user.rating,
  };
}
