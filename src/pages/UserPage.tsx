import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface UserPageProps {
  username: string | null | undefined;
  rating: number;
}

export function UserPage({ username, rating }: UserPageProps) {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/user.css" />}>
      <Navbar currentPath="/user" username={username} />

      <main>
        <div class="username">{username}</div>
        <div class="rating">{rating}</div>
      </main>
    </Layout>
  );
}
