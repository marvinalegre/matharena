import { Hono } from "hono";

import { homeRoutes } from "./homeRoutes";
import { playRoutes } from "./playRoutes";

import { loginRoutes } from "./loginRoutes";
import { logoutRoutes } from "./logoutRoutes";
import { signupRoutes } from "./signupRoutes";

const routes = new Hono();

routes.route("/", homeRoutes);
routes.route("/play", playRoutes);

routes.route("/login", loginRoutes);
routes.route("/logout", logoutRoutes);
routes.route("/signup", signupRoutes);

export default routes;
