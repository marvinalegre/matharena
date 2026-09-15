import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { getUser } from "@/lib/users";
import { TermsOfService } from "@/pages/TermsOfService";

export const termsOfServiceRoutes = new Hono<AppEnv>();

termsOfServiceRoutes.get("/", async (c) => {
  const user = await getUser(c.env.DB, c.get("user")?.userId);
  return c.html(<TermsOfService username={user?.username} />);
});
