import { Hono } from "hono";
import { z } from "zod";

import { signupSchema } from "@/lib/validation";
import { reservedUsernames } from "@/lib/reservedUsernames";
import { hash } from "@/lib/auth";
import { SignupForm } from "@/components/SignupForm";
import { SignupPage } from "@/pages/SignupPage";

export const signupRoutes = new Hono<{ Bindings: Env }>();

signupRoutes.get("/", (c) => c.html(<SignupPage />));

signupRoutes.post("/", async (c) => {
  const body = await c.req.parseBody();
  const username = body.username;
  const password = body.password;

  const result = signupSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return c.html(
      <SignupForm
        values={{
          username: typeof username === "string" ? username : "",
        }}
        fieldErrors={errors.fieldErrors}
      />,
      422,
    );
  }

  const normalizedUsername = result.data.username.toLocaleLowerCase();

  if (reservedUsernames.includes(normalizedUsername)) {
    return c.html(
      <SignupForm
        values={{
          username: result.data.username,
        }}
        fieldErrors={{ username: ["Username is not available"] }}
      />,
      409,
    );
  }

  const isUsernameAvailable =
    (await c.env.DB.prepare(
      `
      select 1
      from users
      where username = ?
      `,
    )
      .bind(normalizedUsername)
      .first()) == null;

  if (!isUsernameAvailable) {
    return c.html(
      <SignupForm
        values={{
          username: result.data.username,
        }}
        fieldErrors={{ username: ["Username is not available"] }}
      />,
      409,
    );
  }

  const hashedPassword = await hash(result.data.password);

  await c.env.DB.prepare(
    `
    insert into users (username, password_hash, salt)
    values (?, ?, ?)
    `,
  )
    .bind(normalizedUsername, hashedPassword.hash, hashedPassword.salt)
    .run();

  return c.newResponse(null, 200, {
    "FX-Redirect": "/login",
  });
});
