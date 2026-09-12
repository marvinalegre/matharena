import { Hono } from "hono";
import { Telegram } from "telegraf";

import type { AppEnv } from "@/types/env";
import routes from "@/routes";
import { authMiddleware } from "@/middlewares";

const app = new Hono<AppEnv>();

app.use("*", authMiddleware());

app.route("/", routes);

app.onError(async (err, c) => {
  console.error(err);

  try {
    const telegram = new Telegram(c.env.TELEGRAM_BOT_TOKEN);

    await telegram.sendMessage(
      c.env.TELEGRAM_CHAT_ID,
      `🚨 Error\n\n${err.message}\n\n${c.req.method} ${c.req.url}`,
    );
  } catch (telegramError) {
    console.error("Telegram notification failed:", telegramError);
  }

  return c.text("Internal Server Error", 500);
});

export default app;
