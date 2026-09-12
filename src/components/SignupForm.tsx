interface Props {
  values?: {
    username?: string;
  };
  fieldErrors?: {
    username?: string[];
    password?: string[];
  };
}

export const SignupForm = ({ values = {}, fieldErrors = {} }: Props) => {
  return (
    <form
      id="signup-form"
      fx-action="/signup"
      fx-method="post"
      fx-target="#signup-form"
      fx-swap="outerHTML"
      ext-fx-disable
    >
      <div>
        <label for="username">Username: </label>

        <input
          id="username"
          name="username"
          type="text"
          value={values.username ?? ""}
          ext-fx-disable-target
        />

        {fieldErrors.username?.map((error) => (
          <p>{error}</p>
        ))}
      </div>

      <div>
        <label for="password">Password: </label>

        <input
          id="password"
          name="password"
          type="password"
          ext-fx-disable-target
        />

        {fieldErrors.password?.map((error) => (
          <p>{error}</p>
        ))}
      </div>

      <button type="submit" ext-fx-disable-target>
        Sign up
      </button>
    </form>
  );
};
