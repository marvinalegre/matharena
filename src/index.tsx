import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.html(<p>hello, world</p>));

app.get("/login", (c) => c.html(<h1>login page</h1>));

app.get("/signup", (c) =>
  c.html(
    <body>
      <h1>signup page</h1>

      <form method="post" action="/api/signup">
        <label>
          username
          <input name="username" />
        </label>
        <label>
          password
          <input name="password" type="password" />
        </label>
        <button type="submit">sign up</button>
      </form>
    </body>,
  ),
);

app.post("/api/signup", async (c) => {
  const body = await c.req.parseBody();

  const username = body.username;
  console.log(username.toUpperCase());
  const password = body.password;

  // signup logic...

  return c.redirect("/login");
});

export default app;
