import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface HomePageProps {
  user: { userId: number } | undefined;
}

export function HomePage({ user }: HomePageProps) {
  return (
    <Layout
      links={<link rel="stylesheet" href="/css/pages/home.css" />}
      scripts={<script defer src="/js/pages/home.js"></script>}
    >
      <Navbar currentPath="/" />

      <div class="page">
        <section class="hero">
          <div class="eyebrow">
            <span class="status-dot"></span>
            ELO-rated math practice
          </div>

          <h1>
            Get better at math.
            <br />
            <span>One problem at a time.</span>
          </h1>

          <p class="subtitle">
            Answer questions, earn ELO, climb the ranks. MathArena matches you
            to problems at exactly your level.
          </p>

          <a href="/play" class="start-button">
            Play 🔥
          </a>

          <div class="question-preview">
            <div class="window-bar">
              <span class="window-dot red"></span>
              <span class="window-dot yellow"></span>
              <span class="window-dot green"></span>
            </div>

            <div class="question-content">
              <span class="elo-badge">1280 ELO</span>

              <p class="question">Solve for x: 3x² − 12x + 9 = 0</p>

              <div class="options">
                <div class="option correct">
                  <span class="option-label">A.</span>x = 1, 3
                </div>

                <div class="option">
                  <span class="option-label">B.</span>x = 2, 4
                </div>

                <div class="option">
                  <span class="option-label">C.</span>x = −1, 3
                </div>

                <div class="option">
                  <span class="option-label">D.</span>x = 1, 9
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
