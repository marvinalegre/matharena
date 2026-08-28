import { FC, Child } from "hono/jsx";

import { HtmlDocument } from "@/layouts/HtmlDocument";

type LayoutProps = {
  links?: Child;
  scripts?: Child;
  children: Child;
};

export const Layout: FC<LayoutProps> = ({ links, scripts, children }) => {
  return (
    <HtmlDocument>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>MathArena</title>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          />
          <link rel="stylesheet" href="/css/main.css" />
          {links}

          <script defer src="/vendor/the-fixi-project/fixi-0.9.4.js"></script>
          <script defer src="/js/main.js"></script>
          {scripts}
        </head>
        <body>
          {children}

          <footer class="container">
            <a href="https://github.com/marvinalegre/matharena" target="_blank">
              source code
            </a>
          </footer>
        </body>
      </html>
    </HtmlDocument>
  );
};
