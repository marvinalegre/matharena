import { Navbar } from "@/components/Navbar";
import { Layout } from "@/layouts/Layout";

type Question = {
  title: string;
  description: string;
  examples: readonly Example[];
};

type Example = {
  question: string;
  answer: string;
};

interface Props {
  username?: string;
  questions: Readonly<Record<string, Question>>;
}

export const QuestionsPage = ({ username, questions }: Props) => {
  return (
    <Layout links={<link rel="stylesheet" href="/css/pages/questions.css" />}>
      <Navbar currentPath="/questions" username={username} />

      <main class="questions-page">
        <h1>Questions</h1>

        <div class="questions">
          {Object.entries(questions).map(([code, question]) => (
            <a class="question" href={`/questions/${code}`}>
              <h2>{question.title}</h2>
              <p>{question.description}</p>
            </a>
          ))}
        </div>
      </main>
    </Layout>
  );
};
