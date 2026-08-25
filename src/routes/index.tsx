import { Hono } from "hono";

import { homeRoutes } from "@/routes/homeRoutes";
import { loginRoutes } from "@/routes/loginRoutes";
import { signupRoutes } from "@/routes/signupRoutes";

const routes = new Hono();

routes.route("/", homeRoutes);
routes.route("/login", loginRoutes);
routes.route("/signup", signupRoutes);

export default routes;
