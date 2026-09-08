import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

export interface LeaderboardUser {
  username: string;
  rating: number;
}

interface Props {
  username?: string;
  leaderboard: LeaderboardUser[];
}

export function LeaderboardPage({ username, leaderboard }: Props) {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/leaderboard.css" />}>
      <Navbar currentPath="/leaderboard" username={username} />

      <main class="leaderboard container">
        <div class="leaderboard__header">
          <h2>Leaderboard</h2>
        </div>

        <div class="leaderboard__list">
          {leaderboard.map((user, index) => (
            <a href={`/${user.username}`}>
              <div class="leaderboard__row">
                <span class="leaderboard__rank emoji">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </span>

                <span class="leaderboard__avatar">
                  {user.username.charAt(0).toUpperCase()}
                </span>

                <span class="leaderboard__name">{user.username}</span>

                <span class="leaderboard__rating">{user.rating}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
}
