export const QUESTIONS = {
  "addition-single-digit-no-carry": {
    title: "Addition Without Carrying",
    description: "Add two single-digit numbers without carrying.",
    examples: [
      { question: String.raw`\[2 + 2 = \; ?\]`, answer: "4" },
      { question: String.raw`\[7 + 1 = \; ?\]`, answer: "8" },
    ],
  },
  "addition-single-digit-carry": {
    title: "Addition With Carrying",
    description: "Add two single-digit numbers with carrying.",
    examples: [
      { question: String.raw`\[6 + 4 = \; ?\]`, answer: "10" },
      { question: String.raw`\[3 + 9 = \; ?\]`, answer: "12" },
    ],
  },
} as const;
