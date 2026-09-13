import type { PlayPageProps } from "@/pages/PlayPage";

export const QuestionForm = ({ question, answer, code }: PlayPageProps) => (
  <form
    id="play-form"
    fx-action="/play"
    fx-method="post"
    fx-target="#target"
    fx-swap="outerHTML"
    ext-fx-disable
  >
    <p id="question">{question}</p>

    {code && (
      <div class="hint">
        <a href={`/questions/${code}`}>Need a hint?</a>
      </div>
    )}

    <input
      name="answer"
      placeholder="Answer"
      autocomplete="off"
      required
      ext-fx-disable-target
    />
    {answer && <input type="hidden" name="correctAnswer" value={answer} />}
    <button type="submit" ext-fx-disable-target>
      Submit
    </button>
  </form>
);
