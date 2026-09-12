interface Props {
  values?: {
    username?: string;
  };
  invalidCreds?: boolean;
}

export const LoginForm = ({ values = {}, invalidCreds }: Props) => {
  return (
    <form
      id="login-form"
      fx-action="/login"
      fx-method="post"
      fx-target="#login-form"
      fx-swap="outerHTML"
      ext-fx-disable
    >
      {invalidCreds && <p>Invalid username or password</p>}
      <div>
        <label for="username">Username: </label>

        <input
          id="username"
          name="username"
          type="text"
          value={values.username ?? ""}
          ext-fx-disable-target
        />
      </div>

      <div>
        <label for="password">Password: </label>

        <input
          id="password"
          name="password"
          type="password"
          ext-fx-disable-target
        />
      </div>

      <button type="submit" ext-fx-disable-target>
        Log in
      </button>
    </form>
  );
};
