type LoginFormProps = {
  values?: {
    username?: string;
  };
  invalidCreds?: boolean;
};

export function LoginForm({ values = {}, invalidCreds }: LoginFormProps) {
  return (
    <form
      id="login-form"
      fx-action="/login"
      fx-method="post"
      fx-target="#login-form"
      fx-swap="outerHTML"
    >
      {invalidCreds && <p>Invalid username or password</p>}
      <div>
        <label for="username">Username</label>

        <input
          id="username"
          name="username"
          type="text"
          value={values.username ?? ""}
        />
      </div>

      <div>
        <label for="password">Password</label>

        <input id="password" name="password" type="password" />
      </div>

      <button type="submit">Log in</button>
    </form>
  );
}
