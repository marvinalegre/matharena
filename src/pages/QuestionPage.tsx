import { QUESTIONS } from "@/lib/questions";
import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

export type QuestionCode = keyof typeof QUESTIONS;

interface Props {
  code: QuestionCode;
  username?: string;
}

export const QuestionPage = ({ code, username }: Props) => {
  const question = QUESTIONS[code];

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
          <link rel="stylesheet" href="/css/pages/question.css" />
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
        </>
      }
    >
      <Navbar username={username} />

      <main class="container">
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <h2>Examples</h2>
        <ul class="examples">
          {question.examples.map((example) => (
            <li class="example">
              <div class="question">{example.question}</div>
              <hr />
              <div class="answer">{example.answer}</div>
            </li>
          ))}
        </ul>

        <a href={`/play?question=${code}`} class="practice-button">
          Practice 🔥
        </a>
      </main>
    </Layout>
  );
};
