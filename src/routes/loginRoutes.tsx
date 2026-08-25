import { Hono } from "hono";

import { LoginPage } from "@/pages/LoginPage";

export const loginRoutes = new Hono();

loginRoutes.get("/", (c) => c.html(<LoginPage />));
