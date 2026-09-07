import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUsername } from "@/lib/users";
import { HomePage } from "@/pages/HomePage";
import { LeaderboardPage, type LeaderboardUser } from "@/pages/LeaderboardPage";

export const homeRoutes = new Hono<AppEnv>();

homeRoutes.get("/", async (c) => {
  return c.html(
    <HomePage username={await getUsername(c.env.DB, c.get("user")?.userId)} />,
  );
});

homeRoutes.get("/leaderboard", async (c) => {
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
    <LeaderboardPage
      username={await getUsername(c.env.DB, c.get("user")?.userId)}
      leaderboard={results}
    />,
  );
});
