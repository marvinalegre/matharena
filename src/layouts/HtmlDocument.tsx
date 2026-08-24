import { FC, PropsWithChildren } from "hono/jsx";
import { html } from "hono/html";

export const HtmlDocument: FC<PropsWithChildren> = ({ children }) => {
  return html`<!doctype html>${children}`;
};
