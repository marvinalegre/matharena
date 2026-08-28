import { FC } from "hono/jsx";

import type { PlayPageProps } from "@/pages/PlayPage";

export const QuestionForm: FC<PlayPageProps> = ({ question, answer }) => (
  <form
    id="play-form"
    fx-action="/play"
    fx-method="post"
    fx-target="#play-form"
    fx-swap="outerHTML"
  >
    <p id="question">{question}</p>
    <input name="answer" placeholder="Answer" autocomplete="off" required />
    {answer && <input type="hidden" name="correctAnswer" value={answer} />}
    <button type="submit">Submit</button>
  </form>
);
