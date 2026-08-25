import { Hono } from "hono";

import { HomePage } from "@/pages/HomePage";

export const homeRoutes = new Hono();

homeRoutes.get("/", (c) => c.html(<HomePage />));
