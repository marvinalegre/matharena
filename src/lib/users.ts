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
