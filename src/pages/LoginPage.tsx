import { Layout } from "@/layouts/Layout";
import { LoginForm } from "@/components/LoginForm";

export function LoginPage() {
  return (
    <Layout
      scripts={
        <>
          <script defer src="/js/pages/signup.js"></script>
          <script defer src="/vendor/the-fixi-project/fixi-0.9.4.js"></script>
        </>
      }
    >
      <h1>login page</h1>

      <LoginForm />
    </Layout>
  );
}
