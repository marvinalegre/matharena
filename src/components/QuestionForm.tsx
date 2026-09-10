import type { PlayPageProps } from "@/pages/PlayPage";

export const QuestionForm = ({ question, answer }: PlayPageProps) => (
  <form
    id="play-form"
    fx-action="/play"
    fx-method="post"
    fx-target="#target"
    fx-swap="outerHTML"
  >
    <p id="question">{question}</p>
    <input name="answer" placeholder="Answer" autocomplete="off" required />
    {answer && <input type="hidden" name="correctAnswer" value={answer} />}
    <button type="submit">Submit</button>
  </form>
);
