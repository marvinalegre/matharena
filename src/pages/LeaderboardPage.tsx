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

export const LeaderboardPage = ({ username, leaderboard }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/leaderboard.css" />}>
      <Navbar currentPath="/leaderboard" username={username} />

      <main class="container">
        <h1>Leaderboard</h1>

        <ol class="users">
          {leaderboard.map((user, index) => (
            <li>
              <a class="user" href={`/${user.username}`}>
                <span class="rank emoji">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </span>

                <span class="username">{user.username}</span>

                <span class="rating">{user.rating}</span>
              </a>
            </li>
          ))}
        </ol>
      </main>
    </Layout>
  );
};
