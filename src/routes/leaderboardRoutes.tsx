import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { LeaderboardPage, type LeaderboardUser } from "@/pages/LeaderboardPage";

export const leaderboardRoutes = new Hono<AppEnv>();

leaderboardRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  const { results } = await c.env.DB.prepare(
    `
  SELECT
    username,
    rating
  FROM users
  WHERE rating IS NOT NULL
  ORDER BY rating DESC
  LIMIT 20;
`,
  ).all<LeaderboardUser>();

  return c.html(
    <LeaderboardPage username={user?.username} leaderboard={results} />,
  );
});
