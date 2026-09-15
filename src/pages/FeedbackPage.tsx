import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username?: string;
}

export const FeedbackPage = ({ username }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/feedback.css" />}>
      <Navbar username={username} />

      <main class="container">
        <header>
          <h1>Feedback</h1>
        </header>

        <p>
          Have a feature request, found a bug, or have an idea for MathArena?
        </p>

        <p>I'd love to hear from you.</p>

        <p class="email">
          <strong>Email:</strong>{" "}
          <a href="mailto:marvinalegredev@gmail.com">
            marvinalegredev@gmail.com
          </a>
        </p>
      </main>
    </Layout>
  );
};
