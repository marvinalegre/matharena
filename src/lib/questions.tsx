export const QUESTIONS = {
  "addition-single-digit-no-carry": {
    title: "Single Digit Addition Without Carrying",
    description: "Add two single-digit numbers without carrying.",
    examples: [
      { question: <p>{String.raw`\[2 + 2 = \; ?\]`}</p>, answer: "4" },
      { question: <p>{String.raw`\[7 + 1 = \; ?\]`}</p>, answer: "8" },
    ],
  },
  "addition-single-digit-carry": {
    title: "Single Digit Addition With Carrying",
    description: "Add two single-digit numbers with carrying.",
    examples: [
      { question: <p>{String.raw`\[6 + 4 = \; ?\]`}</p>, answer: "10" },
      { question: <p>{String.raw`\[3 + 9 = \; ?\]`}</p>, answer: "12" },
    ],
  },
  "addition-single-double-digit-under-20": {
    title: "Addition Under 20",
    description:
      "Add a single-digit number and a two-digit number with a sum under 20.",
    examples: [
      { question: <p>{String.raw`\[2 + 16 = \; ?\]`}</p>, answer: "18" },
      { question: <p>{String.raw`\[4 + 10 = \; ?\]`}</p>, answer: "14" },
    ],
  },
  "addition-double-digit-under-100": {
    title: "Addition Under 100",
    description: "Add two two-digit numbers with a sum under 100.",
    examples: [
      { question: <p>{String.raw`\[30 + 22 = \; ?\]`}</p>, answer: "52" },
      { question: <p>{String.raw`\[42 + 55 = \; ?\]`}</p>, answer: "97" },
    ],
  },

  "subtraction-single-digit-no-borrow": {
    title: "Single Digit Subtraction Without Borrowing",
    description:
      "Subtract one single-digit number from another without borrowing.",
    examples: [
      { question: <p>{String.raw`\[7 - 6 = \; ?\]`}</p>, answer: "1" },
      { question: <p>{String.raw`\[9 - 2 = \; ?\]`}</p>, answer: "7" },
    ],
  },
  "subtraction-double-single-digit-under-20": {
    title: "Subtraction Under 20 With Borrowing",
    description:
      "Subtract a single-digit number from a two-digit number under 20 with borrowing.",
    examples: [
      { question: <p>{String.raw`\[11 - 2 = \; ?\]`}</p>, answer: "9" },
      { question: <p>{String.raw`\[15 - 9 = \; ?\]`}</p>, answer: "6" },
    ],
  },
  "subtraction-double-digit-under-100": {
    title: "Subtraction Under 100",
    description:
      "Subtract one two-digit number from another with a positive result under 100.",
    examples: [
      { question: <p>{String.raw`\[50 - 35 = \; ?\]`}</p>, answer: "15" },
      { question: <p>{String.raw`\[42 - 23 = \; ?\]`}</p>, answer: "19" },
    ],
  },

  "count-coins-20": {
    title: "Counting Coins",
    description:
      "Count coins with values of 1, 5, and 10 berries to find the total.",
    info: (
      <div class="info">
        <h3>Berry Coins</h3>
        <p class="subtitle">
          Each coin is worth a different number of berries.
        </p>

        <div class="coin-legend">
          <div class="legend-item">
            <div class="coin coin-1">1</div>
            <span>1 berry</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-5">5</div>
            <span>5 berries</span>
          </div>

          <div class="legend-item">
            <div class="coin coin-10">10</div>
            <span>10 berries</span>
          </div>
        </div>
      </div>
    ),

    examples: [
      {
        question: (
          <>
            <div class="coins">
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-10">10</div>
            </div>
            <p class="text-center">How many berries is that?</p>
          </>
        ),
        answer: "13",
      },
      {
        question: (
          <>
            <div class="coins">
              <div class="coin coin-5">5</div>
              <div class="coin coin-5">5</div>
              <div class="coin coin-10">10</div>
            </div>
            <p class="text-center">How many berries is that?</p>
          </>
        ),
        answer: "20",
      },
      {
        question: (
          <>
            <div class="coins">
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
              <div class="coin coin-1">1</div>
            </div>
            <p class="text-center">How many berries is that?</p>
          </>
        ),
        answer: "7",
      },
    ],
  },

  "count-10-random-dots": {
    title: "Counting to 10",
    description: "Count the number of dots.",
    examples: [
      {
        question: (
          <>
            <p class="text-center">Count the dots.</p>
            <div class="dots">
              <span
                class="dot"
                style="left: 21.85755703926936%; top: 96.120241653553%"
              ></span>
              <span
                class="dot"
                style="left: 2.0539685489287085%; top: 84.03175894637086%"
              ></span>
              <span
                class="dot"
                style="left: 39.2053120757457%; top: 50.681608327864424%"
              ></span>
              <span
                class="dot"
                style="left: 18.51703023080634%; top: 10.55145755024377%"
              ></span>
              <span
                class="dot"
                style="left: 9.103292523026896%; top: 52.39001517983628%"
              ></span>
              <span
                class="dot"
                style="left: 71.94040129702451%; top: 19.32417276110675%"
              ></span>
              <span
                class="dot"
                style="left: 71.54301614588024%; top: 37.191551836343294%"
              ></span>
            </div>
          </>
        ),

        answer: "7",
      },
    ],
  },
  "count-20-random-dots": {
    title: "Counting to 20",
    description: "Count the number of dots from 11 to 20.",
    examples: [
      {
        question: (
          <>
            <p class="text-center">Count the dots.</p>
            <div class="dots">
              <span
                class="dot"
                style="left: 96.73469636297337%; top: 19.207849097994156%"
              ></span>
              <span
                class="dot"
                style="left: 73.15889404473202%; top: 84.20769735530443%"
              ></span>
              <span
                class="dot"
                style="left: 96.51497293082468%; top: 51.05203879210581%"
              ></span>
              <span
                class="dot"
                style="left: 81.70933893260128%; top: 65.48381635900586%"
              ></span>
              <span
                class="dot"
                style="left: 26.171630936051294%; top: 44.90855324736545%"
              ></span>
              <span
                class="dot"
                style="left: 65.33594551169024%; top: 69.81479992338615%"
              ></span>
              <span
                class="dot"
                style="left: 64.58519627511664%; top: 5.992841760837441%"
              ></span>
              <span
                class="dot"
                style="left: 33.951305102740335%; top: 26.828306748138896%"
              ></span>
              <span
                class="dot"
                style="left: 4.259343127189441%; top: 32.04450143383848%"
              ></span>
              <span
                class="dot"
                style="left: 67.97771123031605%; top: 96.7247251851328%"
              ></span>
              <span
                class="dot"
                style="left: 56.4028298627801%; top: 17.947032588247104%"
              ></span>
              <span
                class="dot"
                style="left: 16.060786368980594%; top: 22.384032068700023%"
              ></span>
              <span
                class="dot"
                style="left: 9.845082277077344%; top: 41.9285386027796%"
              ></span>
            </div>
          </>
        ),

        answer: "13",
      },
    ],
  },

  "count-20-50-dots-in-columns": {
    title: "Counting Dots in Columns",
    description: "Count the dots arranged in columns.",
    examples: [
      {
        question: (
          <>
            <p class="text-center">Count the dots.</p>
            <div class="dots">
              <span
                class="dot"
                style="left: 8.333333333333332%; top: 10%"
              ></span>
              <span class="dot" style="left: 25%; top: 10%"></span>
              <span
                class="dot"
                style="left: 41.66666666666667%; top: 10%"
              ></span>
              <span
                class="dot"
                style="left: 58.333333333333336%; top: 10%"
              ></span>
              <span class="dot" style="left: 75%; top: 10%"></span>
              <span
                class="dot"
                style="left: 91.66666666666666%; top: 10%"
              ></span>
              <span
                class="dot"
                style="left: 8.333333333333332%; top: 30%"
              ></span>
              <span class="dot" style="left: 25%; top: 30%"></span>
              <span
                class="dot"
                style="left: 41.66666666666667%; top: 30%"
              ></span>
              <span
                class="dot"
                style="left: 58.333333333333336%; top: 30%"
              ></span>
              <span class="dot" style="left: 75%; top: 30%"></span>
              <span
                class="dot"
                style="left: 91.66666666666666%; top: 30%"
              ></span>
              <span
                class="dot"
                style="left: 8.333333333333332%; top: 50%"
              ></span>
              <span class="dot" style="left: 25%; top: 50%"></span>
              <span
                class="dot"
                style="left: 41.66666666666667%; top: 50%"
              ></span>
              <span
                class="dot"
                style="left: 58.333333333333336%; top: 50%"
              ></span>
              <span class="dot" style="left: 75%; top: 50%"></span>
              <span
                class="dot"
                style="left: 91.66666666666666%; top: 50%"
              ></span>
              <span
                class="dot"
                style="left: 8.333333333333332%; top: 70%"
              ></span>
              <span class="dot" style="left: 25%; top: 70%"></span>
              <span
                class="dot"
                style="left: 41.66666666666667%; top: 70%"
              ></span>
              <span
                class="dot"
                style="left: 58.333333333333336%; top: 70%"
              ></span>
              <span class="dot" style="left: 75%; top: 70%"></span>
              <span
                class="dot"
                style="left: 91.66666666666666%; top: 70%"
              ></span>
              <span
                class="dot"
                style="left: 8.333333333333332%; top: 90%"
              ></span>
              <span class="dot" style="left: 25%; top: 90%"></span>
              <span
                class="dot"
                style="left: 41.66666666666667%; top: 90%"
              ></span>
            </div>
          </>
        ),
        answer: "27",
      },
    ],
  },

  "ordinal-before-after-10": {
    title: "Before and After Ordinals (10th)",
    description:
      "Identify the ordinal that comes before or after a given ordinal.",

    examples: [
      {
        question: (
          <p class="text-center my-3">{String.raw`What comes after \(6th\)?`}</p>
        ),
        answer: "7th",
      },
      {
        question: (
          <p class="text-center my-3">{String.raw`What comes before \(2nd\)?`}</p>
        ),
        answer: "1st",
      },
    ],
  },

  "place-value-2-digit": {
    title: "Place Value in Two-Digit Numbers",
    description: "Identify the place value of a digit in a two-digit number.",
    examples: [
      {
        question: (
          <p class="text-center my-3">{String.raw`What is the place value of \(4\) in \(47\)?`}</p>
        ),
        answer: "tens",
      },
      {
        question: (
          <p class="text-center my-3">{String.raw`What is the place value of \(6\) in \(63\)?`}</p>
        ),
        answer: "tens",
      },
      {
        question: (
          <p class="text-center my-3">{String.raw`What is the place value of \(8\) in \(28\)?`}</p>
        ),
        answer: "ones",
      },
    ],
  },
} as const;
