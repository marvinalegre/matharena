import { Navbar } from "@/components/Navbar";
import { QuestionForm } from "@/components/QuestionForm";
import { Layout } from "@/layouts/Layout";

type Props = {
  user: { userId: number } | undefined;
};

export function PlayPage({ user }: Props) {
  return (
    <Layout
      links={
        <>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css"
            integrity="sha384-1vdNCNel6Tx/NQa8IR1mGOGKsbGreCkOPfbtPPnUURJ5Tu2PRVfQ/7KLZC+Pi1p1"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="/css/pages/play.css" />
        </>
      }

      scripts={
        <>
          <script
            defer
            src="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.js"
            integrity="sha384-ycJ6GAwiS15LoUPipwJOrWTvkUHl/YqELValBwI5I4awP1EeEQJYarj+w85ntcz7"
            crossorigin="anonymous"
          ></script>
          <script
            defer
            src="https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/contrib/auto-render.min.js"
            integrity="sha384-bjyGPfbij8/NDKJhSGZNP/khQVgtHUE5exjm4Ydllo42FwIgYsdLO2lXGmRBf5Mz"
            crossorigin="anonymous"
            onload="renderMathInElement(document.body);"
          ></script>
          <script defer src="/js/pages/play.js"></script>
        </>
      }
    >
      <Navbar currentPath="/play" />
      <main class="container">
        <QuestionForm />
      </main>
    </Layout>
  );
}
