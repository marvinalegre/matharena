import { Hono } from "hono";
import { z } from "zod";

import { signupSchema } from "@/lib/validation";
import { SignupForm } from "@/components/SignupForm";
import { SignupPage } from "@/pages/SignupPage";

export const signupRoutes = new Hono();

signupRoutes.get("/signup", (c) => c.html(<SignupPage />));

signupRoutes.post("/signup", async (c) => {
  const body = await c.req.parseBody();

  const result = signupSchema.safeParse({
    username: body.username,
    password: body.password,
  });

  if (!result.success) {
    const errors = z.flattenError(result.error);

    return c.html(
      <SignupForm
        values={{
          username: typeof body.username === "string" ? body.username : "",
        }}
        fieldErrors={errors.fieldErrors}
      />,
      422,
    );
  }

  return c.newResponse(null, 200, {
    "FX-Redirect": "/login",
  });
});
