import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { UserPage } from "@/pages/UserPage";

export const userRoutes = new Hono<AppEnv>();

userRoutes.get("/:username", async (c) => {
  const username = c.req.param("username");
  const user = await getUser(c.env.DB, username);

  if (!user) {
    return c.text("User not found", 404);
  }

  return c.html(<UserPage username={user?.username} rating={user?.rating} />);
});
