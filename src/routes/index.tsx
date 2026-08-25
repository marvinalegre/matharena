import { Hono } from "hono";

import { loginRoutes } from "@/routes/loginRoutes";
import { signupRoutes } from "@/routes/signupRoutes";

const routes = new Hono();

routes.route("/login", loginRoutes);
routes.route("/signup", signupRoutes);

export default routes;
