import { Hono } from "hono";
import { signupSchema } from "@/lib/validation";
import { z } from "zod";
import { SignupForm } from "@/components/SignupForm";
import { SignupPage } from "@/pages/SignupPage";

export const homeRoutes = new Hono();

homeRoutes.get("/login", (c) => c.html(<h1>login page</h1>));

homeRoutes.get("/signup", (c) => c.html(<SignupPage />));

homeRoutes.post("/api/signup", async (c) => {
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
