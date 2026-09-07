import { Layout } from "@/layouts/Layout";
import { SignupForm } from "@/components/SignupForm";

export function SignupPage() {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/signup.css" />}>
      <main class="signup-page">
        <section class="signup-page__card">
          <div class="signup-page__header">
            <p class="signup-page__eyebrow">MATHARENA</p>

            <h1>Create your account</h1>

            <p class="signup-page__subtitle">Start your math journey.</p>
          </div>

          <SignupForm />

          <p class="signup-page__footer">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
