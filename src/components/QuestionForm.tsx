import { FC } from "hono/jsx";

export const QuestionForm: FC = () => (
  <form
    id="play-form"
    fx-action="/play"
    fx-method="post"
    fx-target="#play-form"
    fx-swap="outerHTML"
  >
    <p id="question">\[1 + 1 = \; ?\]</p>
    <input name="answer" placeholder="Answer" autocomplete="off" required />
    <button type="submit">Submit</button>
  </form>
);
