# Math Arena

Math Arena is a lightweight math practice game where you solve questions, build your rating, and compete on the leaderboard.

## Features

- 🧮 Math questions with different difficulty levels
- 📈 ELO-style rating system
- 🏆 Global leaderboard
- ⚡ Fast, low-bandwidth interface
- 🔥 Instant feedback after each answer

## Tech stack

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Hono](https://hono.dev/)
- TypeScript
- Cloudflare D1
- Cloudflare KV
- [MathForge](https://github.com/marvinalegre/mathforge) for question generation
- KaTeX for math rendering
- fixijs for interactive UI

## Development

Install dependencies:

```sh
pnpm install
```

Run the development server:

```sh
pnpm dev
```

Type-check:

```sh
pnpm exec tsc --noEmit
```

Deploy:

```sh
pnpm deploy
```

## Project structure

```text
src/
├── lib/          # Shared application logic
├── middleware/   # Request middleware
├── pages/        # JSX page components
└── routes/       # HTTP routes
```

## License

See [LICENSE](LICENSE).
