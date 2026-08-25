import { Layout } from "@/layouts/Layout";

export function HomePage() {
  return (
    <Layout
      scripts={
        <>
          <script defer src="/js/pages/home.js"></script>
          <script defer src="/vendor/the-fixi-project/fixi-0.9.4.js"></script>
        </>
      }
    >
      <h1>home page</h1>
    </Layout>
  );
}
