import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

interface Question {
  code: string;
  title: string;
  description: string;
  examples: { question: string; answer: string }[];
}

interface Props {
  username?: string;
  questions: Question[];
}

export const QuestionsPage = ({ username, questions }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/questions.css" />}>
      <Navbar currentPath="/questions" username={username} />

      <main class="questions-page">
        <h1>Questions</h1>

        <div class="questions">
          {questions.map((question) => (
            <a class="question" href={`/questions/${question.code}`}>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
};
