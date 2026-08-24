import { Layout } from "@/layouts/Layout";
import { SignupForm } from "@/components/SignupForm";

export function SignupPage() {
  return (
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
    </Layout>
  );
}
