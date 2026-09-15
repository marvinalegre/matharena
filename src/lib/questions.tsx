export const QUESTIONS = {
  "addition-single-digit-no-carry": {
    title: "Addition Without Carrying",
    description: "Add two single-digit numbers without carrying.",
    examples: [
      { question: <p>{String.raw`\[2 + 2 = \; ?\]`}</p>, answer: "4" },
      { question: <p>{String.raw`\[7 + 1 = \; ?\]`}</p>, answer: "8" },
    ],
  },
  "addition-single-digit-carry": {
    title: "Addition With Carrying",
    description: "Add two single-digit numbers with carrying.",
    examples: [
      { question: <p>{String.raw`\[6 + 4 = \; ?\]`}</p>, answer: "10" },
      { question: <p>{String.raw`\[3 + 9 = \; ?\]`}</p>, answer: "12" },
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
} as const;
