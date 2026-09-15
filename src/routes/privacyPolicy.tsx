import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";

export const privacyPolicyRoutes = new Hono<AppEnv>();

privacyPolicyRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  return c.html(<PrivacyPolicy username={user?.username} />);
});
