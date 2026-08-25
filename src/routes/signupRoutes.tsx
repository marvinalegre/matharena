import { Hono } from "hono";
import { z } from "zod";

import { signupSchema } from "@/lib/validation";
import { reservedUsernames } from "@/lib/reservedUsernames";
import { hash } from "@/lib/auth";
import { SignupForm } from "@/components/SignupForm";
import { SignupPage } from "@/pages/SignupPage";

export const signupRoutes = new Hono<{ Bindings: Env }>();

signupRoutes.get("/signup", (c) => c.html(<SignupPage />));

signupRoutes.post("/signup", async (c) => {
  const body = await c.req.parseBody();
  let username = body.username;
  const password = body.password;
  if (typeof username !== "string" || typeof password !== "string") {
    return c.text("Internal Server Error", 500);
  }
  username = username.toLocaleLowerCase();

  const result = signupSchema.safeParse({
    username,
    password,
  });

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return c.html(
      <SignupForm
        values={{
          username,
        }}
        fieldErrors={errors.fieldErrors}
      />,
      422,
    );
  }

  if (reservedUsernames.includes(username)) {
    return c.html(
      <SignupForm
        values={{
          username,
        }}
        fieldErrors={{ username: ["Username is not available"] }}
      />,
      422,
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
      .bind(username)
      .first()) == null;

  if (!isUsernameAvailable) {
    return c.html(
      <SignupForm
        values={{
          username,
        }}
        fieldErrors={{ username: ["Username is not available"] }}
      />,
      422,
    );
  }

  const hashedPassword = await hash(password);

  await c.env.DB.prepare(
    `
    insert into users (username, password_hash, salt)
    values (?, ?, ?)
    `,
  )
    .bind(username, hashedPassword.hash, hashedPassword.salt)
    .run();

  return c.newResponse(null, 200, {
    "FX-Redirect": "/login",
  });
});
