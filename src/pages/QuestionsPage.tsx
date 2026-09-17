import { Child } from "hono/jsx";
import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Question {
  title: string;
  description: string;
  info?: Child;
  examples: readonly Example[];
}

interface Example {
  question: Child;
  answer: string;
}

interface Props {
  username?: string;
  questions: Readonly<Record<string, Question>>;
}

export const QuestionsPage = ({ username, questions }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/questions.css" />}>
      <Navbar currentPath="/questions" username={username} />

      <main class="container">
        <h1>Questions</h1>

        <ul class="questions">
          {Object.entries(questions).map(([code, question]) => (
            <li>
              <a class="question" href={`/questions/${code}`}>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};
