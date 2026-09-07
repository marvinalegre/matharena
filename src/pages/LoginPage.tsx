import { Layout } from "@/layouts/Layout";
import { LoginForm } from "@/components/LoginForm";

export function LoginPage() {
  return (
    <Layout
      links={<link rel="stylesheet" href="/css/pages/login.css" />}

      scripts={<script defer src="/js/pages/login.js"></script>}
    >
      <main class="login-page">
        <section class="login-page__card">
          <div class="login-page__header">
            <a href="/">
              <p class="login-page__eyebrow">MATHARENA</p>
            </a>
            <h1>Welcome back</h1>
            <p class="login-page__subtitle">
              Log in to continue your math journey.
            </p>
          </div>

          <LoginForm />

          <p class="login-page__footer">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
