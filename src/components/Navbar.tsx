import { FC } from "hono/jsx";

type NavbarProps = {
  currentPath: string;
};

export const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  return (
    <header class="container navbar">
      <div>
        <button class="navbar__menu-btn">
          <i class="fa-solid fa-bars" style="font-size: 1.45rem"></i>
        </button>
        <a class="navbar__brand" href="/">
          MathArena
        </a>
      </div>

      <nav id="side-nav" class="navbar__nav">
        <a
          href="/leaderboard"
          aria-current={currentPath === "/players" ? "page" : undefined}
        >
          Leaderboard
        </a>
      </nav>

      <button class="navbar__user-badge">user</button>

      <div id="nav-overlay" class="navbar__overlay"></div>
    </header>
  );
};
