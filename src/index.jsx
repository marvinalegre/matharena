import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.html(<p>hello, world</p>));

export default app;
