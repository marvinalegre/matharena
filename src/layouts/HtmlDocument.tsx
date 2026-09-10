import { PropsWithChildren } from "hono/jsx";
import { html } from "hono/html";

export const HtmlDocument = ({ children }: PropsWithChildren) => {
  return html`<!doctype html>${children}`;
};
