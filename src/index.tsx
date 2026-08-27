import { Hono } from "hono";

import type { AppEnv } from "@/types/env";
import routes from "@/routes";
import { authMiddleware } from "@/middlewares/authMiddleware";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware());

app.route("/", routes);

export default app;
