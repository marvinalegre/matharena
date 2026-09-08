import { Hono } from "hono";

import { homeRoutes } from "./homeRoutes";
import { playRoutes } from "./playRoutes";

import { loginRoutes } from "./loginRoutes";
import { logoutRoutes } from "./logoutRoutes";
import { signupRoutes } from "./signupRoutes";
import { userRoutes } from "./userRoutes";
import { leaderboardRoutes } from "./leaderboardRoutes";

const routes = new Hono();

routes.route("/", homeRoutes);

routes.route("/play", playRoutes);
routes.route("/leaderboard", leaderboardRoutes);
routes.route("/login", loginRoutes);
routes.route("/logout", logoutRoutes);
routes.route("/signup", signupRoutes);

routes.route("/", userRoutes);

export default routes;
