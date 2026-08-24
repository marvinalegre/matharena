import { Hono } from "hono";
import { signupSchema } from "@/lib/validation";
import { z } from "zod";
import { Layout } from "@/layouts/Layout";

export const homeRoutes = new Hono();

homeRoutes.get("/login", (c) => c.html(<h1>login page</h1>));

homeRoutes.get("/signup", (c) =>
  c.html(
    <Layout
      scripts={
        <>
          <script defer src="/js/pages/signup.js"></script>
          <script defer src="/vendor/the-fixi-project/fixi-0.9.4.js"></script>
        </>
      }
    >
      <h1>signup page</h1>

      <SignupForm />
    </Layout>,
  ),
);

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

type SignupFormProps = {
  values?: {
    username?: string;
  };
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
};

function SignupForm({ values = {}, fieldErrors = {} }: SignupFormProps) {
  return (
    <form
      id="signup-form"
      fx-action="/api/signup"
      fx-method="post"
      fx-target="#signup-form"
      fx-swap="outerHTML"
    >
      <div>
        <label for="username">Username</label>

        <input
          id="username"
          name="username"
          type="text"
          value={values.username ?? ""}
        />

        {fieldErrors.username?.map((error) => (
          <p>{error}</p>
        ))}
      </div>

      <div>
        <label for="password">Password</label>

        <input id="password" name="password" type="password" />

        {fieldErrors.password?.map((error) => (
          <p>{error}</p>
        ))}
      </div>

      <button type="submit">Sign up</button>
    </form>
  );
}
