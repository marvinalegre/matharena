import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

type Props = {
  user: { userId: number } | undefined;
};

export function HomePage({ user }: Props) {
  return (
    <Layout scripts={<script defer src="/js/pages/home.js"></script>}>
      <Navbar currentPath="/" />
    </Layout>
  );
}
