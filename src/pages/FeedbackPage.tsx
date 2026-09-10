import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username: string | null | undefined;
}

export const FeedbackPage = ({ username }: Props) => {
  return (
    <Layout
      links={<link rel="stylesheet" href="/css/pages/feedback.css" />}
      scripts={<script defer src="/js/pages/home.js"></script>}
    >
      <Navbar currentPath="/" username={username} />

      <main class="feedback-page">
        <section class="feedback-content">
          <h1>Feedback</h1>

          <p>
            Have a feature request, found a bug, or have an idea for MathArena?
          </p>

          <p>I'd love to hear from you.</p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:marvinalegredev@gmail.com">
              marvinalegredev@gmail.com
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
};
