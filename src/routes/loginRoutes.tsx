import { Hono } from "hono";

export const loginRoutes = new Hono();

loginRoutes.get("/login", (c) => c.html(<h1>login page</h1>));
