import { Hono } from "hono";

import { signupSchema } from "@/lib/validation";
import { verify } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import { LoginPage } from "@/pages/LoginPage";

export const loginRoutes = new Hono<{ Bindings: Env }>();

loginRoutes.get("/", (c) => c.html(<LoginPage />));

loginRoutes.post("/", async (c) => {
  const body = await c.req.parseBody();
  const username = body.username;
  const password = body.password;

  const result = signupSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    return c.html(
      <LoginForm
        values={{
          username: typeof username === "string" ? username : "",
        }}
        invalidCreds={true}
      />,
      401,
    );
  }

  const normalizedUsername = result.data.username.toLowerCase();
  const user = await c.env.DB.prepare(
    `
    SELECT id, password_hash, salt
    FROM users
    WHERE username = ?
    `,
  )
    .bind(normalizedUsername)
    .first<{
      id: number;
      password_hash: string;
      salt: string;
    }>();

  if (!user) {
    return c.html(
      <LoginForm
        values={{
          username: typeof username === "string" ? username : "",
        }}
        invalidCreds={true}
      />,
      401,
    );
  }

  if (!(await verify(result.data.password, user.salt, user.password_hash))) {
    return c.html(
      <LoginForm
        values={{
          username: typeof username === "string" ? username : "",
        }}
        invalidCreds={true}
      />,
      401,
    );
  }
});
