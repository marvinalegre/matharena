export function getUser(
  db: D1Database,
  userId: number | undefined,
): Promise<{ username: string; rating: number } | null>;

export function getUser(
  db: D1Database,
  username: string | undefined,
): Promise<{ username: string; rating: number } | null>;

export async function getUser(
  db: D1Database,
  identifier: number | string | undefined,
) {
  if (identifier === undefined) return null;

  const column = typeof identifier === "number" ? "id" : "username";

  return db
    .prepare(`SELECT username, rating FROM users WHERE ${column} = ?`)
    .bind(identifier)
    .first<{ username: string; rating: number }>();
}

export async function updateUserRating(
  db: D1Database,
  userId: number,
  rating: number,
) {
  await db
    .prepare("UPDATE users SET rating = ? WHERE id = ?")
    .bind(rating, userId)
    .run();
}
