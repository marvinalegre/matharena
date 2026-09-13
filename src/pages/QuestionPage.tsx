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
    <Layout links={<link rel="stylesheet" href="/css/pages/question.css" />}>
      <Navbar username={username} />

      <main class="question-page">
        <h1>{question.title}</h1>
        <p>{question.description}</p>

        <h2>Examples</h2>

        <ul>
          {question.examples.map((example) => (
            <li key={example.question}>
              {example.question} = {example.answer}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
