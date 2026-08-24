import { Hono } from "hono";

import { loginRoutes } from "@/routes/loginRoutes";
import { signupRoutes } from "@/routes/signupRoutes";

const routes = new Hono();

routes.route("/", loginRoutes);
routes.route("/", signupRoutes);

export default routes;
