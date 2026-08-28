import { FC } from "hono/jsx";

type NavbarProps = {
  currentPath: string;
};

export const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  return (
    <header class="container navbar">
      <a class="navbar__brand" href="/">
        MathArena
      </a>

      <i id="menu-btn" class="fa-solid fa-bars" style="font-size: 1.45rem"></i>

      <nav id="side-nav" class="navbar__nav">
        <a
          href="/leaderboard"
          aria-current={currentPath === "/players" ? "page" : undefined}
        >
          Leaderboard
        </a>
      </nav>

      <div id="nav-overlay" class="navbar__overlay"></div>
    </header>
  );
};
