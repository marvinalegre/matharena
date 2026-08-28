import { Layout } from "@/layouts/Layout";
import { LoginForm } from "@/components/LoginForm";

export function LoginPage() {
  return (
    <Layout scripts={<script defer src="/js/pages/login.js"></script>}>
      <h1>login page</h1>

      <LoginForm />
    </Layout>
  );
}
