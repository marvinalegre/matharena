import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username: string | null;
}

export function LeaderboardPage({ username }: Props) {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/leaderboard.css" />}>
      <Navbar currentPath="/leaderboard" username={username} />

      <main class="leaderboard container">
        <div class="leaderboard__header">
          <h2>Leaderboard</h2>
        </div>

        <div class="leaderboard__list">
          <div class="leaderboard__row">
            <span class="leaderboard__rank emoji">🥇</span>
            <span class="leaderboard__avatar">A</span>
            <span class="leaderboard__name">Alex</span>
            <span class="leaderboard__elo">1542 ELO</span>
          </div>

          <div class="leaderboard__row">
            <span class="leaderboard__rank emoji">🥈</span>
            <span class="leaderboard__avatar">J</span>
            <span class="leaderboard__name">Jamie</span>
            <span class="leaderboard__elo">1498 ELO</span>
          </div>

          <div class="leaderboard__row">
            <span class="leaderboard__rank emoji">🥉</span>
            <span class="leaderboard__avatar">M</span>
            <span class="leaderboard__name">Marvin</span>
            <span class="leaderboard__elo">1280 ELO</span>
          </div>

          <div class="leaderboard__row">
            <span class="leaderboard__rank">4</span>
            <span class="leaderboard__avatar">S</span>
            <span class="leaderboard__name">Sam</span>
            <span class="leaderboard__elo">1214 ELO</span>
          </div>

          <div class="leaderboard__row">
            <span class="leaderboard__rank">5</span>
            <span class="leaderboard__avatar">R</span>
            <span class="leaderboard__name">Riley</span>
            <span class="leaderboard__elo">1187 ELO</span>
          </div>
        </div>
      </main>
    </Layout>
  );
}
