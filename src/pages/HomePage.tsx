import { Layout } from "@/layouts/Layout";

type Props = {
  user: { userId: number } | undefined;
};

export function HomePage({ user }: Props) {
  return (
    <Layout scripts={<script defer src="/js/pages/home.js"></script>}>
      <h1>home page</h1>

      {user ? (
        <button fx-action="/logout" fx-method="post" fx-target="body">
          Log out
        </button>
      ) : (
        <>
          <a href="/login">Log in</a>
          <br />
          <a href="/signup">Sign up</a>
        </>
      )}
    </Layout>
  );
}
