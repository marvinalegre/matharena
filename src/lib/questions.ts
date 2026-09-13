export const QUESTIONS = {
  "addition-single-digit-no-carry": {
    title: "Addition Without Carrying",
    description: "Add two single-digit numbers without carrying.",
    examples: [
      { question: "3 + 4", answer: "7" },
      { question: "2 + 6", answer: "8" },
    ],
  },
  "addition-single-digit-carry": {
    title: "Addition With Carrying",
    description: "Add two single-digit numbers with carrying.",
    examples: [
      { question: "7 + 8", answer: "15" },
      { question: "6 + 9", answer: "15" },
    ],
  },
} as const;
