import { Hono } from "hono";
import { z } from "zod";

import { signupSchema } from "@/lib/validation";
import { reservedUsernames } from "@/lib/reservedUsernames";
import { SignupForm } from "@/components/SignupForm";
import { SignupPage } from "@/pages/SignupPage";

export const signupRoutes = new Hono();

signupRoutes.get("/signup", (c) => c.html(<SignupPage />));

signupRoutes.post("/signup", async (c) => {
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

  if (reservedUsernames.includes(result.data.username)) {
    return c.html(
      <SignupForm
        values={{
          username: result.data.username,
        }}
        fieldErrors={{ username: ["Username is not available"] }}
      />,
      422,
    );
  }

  return c.newResponse(null, 200, {
    "FX-Redirect": "/login",
  });
});
