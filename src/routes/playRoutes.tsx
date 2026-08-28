import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import { PlayPage } from "@/pages/PlayPage";

export const playRoutes = new Hono<AppEnv>();

playRoutes.get("/", (c) => c.html(<PlayPage user={c.get("user")} />));
