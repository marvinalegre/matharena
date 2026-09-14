import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Props {
  username?: string;
  rating: number;
  requestedUsername: string;
}

export const UserPage = ({ username, rating, requestedUsername }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/user.css" />}>
      <Navbar username={username} />

      <main>
        <div class="username">{requestedUsername}</div>
        <div class="rating">{rating}</div>
      </main>
    </Layout>
  );
};
