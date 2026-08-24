type SignupFormProps = {
  values?: {
    username?: string;
  };
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
};

export function SignupForm({ values = {}, fieldErrors = {} }: SignupFormProps) {
  return (
    <form
      id="signup-form"
      fx-action="/signup"
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
