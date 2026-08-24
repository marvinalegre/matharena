import { Hono } from "hono";

import { homeRoutes } from "@/routes";

const app = new Hono();

app.route("/", homeRoutes);

export default app;
