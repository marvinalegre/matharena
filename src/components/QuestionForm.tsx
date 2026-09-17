import type { PlayPageProps } from "@/pages/PlayPage";

export const QuestionForm = ({
  question,
  correctAnswer,
  questionCode,
}: PlayPageProps) => (
  <form
    id="play-form"
    fx-action="/play"
    fx-method="post"
    fx-target="#target"
    fx-swap="outerHTML"
    ext-fx-disable
  >
    <div class="question">{question}</div>

    {questionCode && (
      <div class="hint">
        <a href={`/questions/${questionCode}`} target="_blank" rel="noopener ">
          Need a hint?
        </a>
      </div>
    )}

    <input
      name="answer"
      placeholder="Answer"
      autocomplete="off"
      required
      ext-fx-disable-target
    />
    {correctAnswer && (
      <input type="hidden" name="correctAnswer" value={correctAnswer} />
    )}
    <button type="submit" ext-fx-disable-target>
      Submit
    </button>
  </form>
);
