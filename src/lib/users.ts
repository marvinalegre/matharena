export async function getUsername(
  db: D1Database,
  userId: number | undefined,
): Promise<string | null> {
  if (userId === undefined) return null;
  const user = await db
    .prepare("SELECT username FROM users WHERE id = ?")
    .bind(userId)
    .first<{ username: string }>();

  return user?.username ?? null;
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
