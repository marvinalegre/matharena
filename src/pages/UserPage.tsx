import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username?: string;
  rating: number;
}

export const UserPage = ({ username, rating }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/user.css" />}>
      <Navbar currentPath="/user" username={username} />

      <main>
        <div class="username">{username}</div>
        <div class="rating">{rating}</div>
      </main>
    </Layout>
  );
};
