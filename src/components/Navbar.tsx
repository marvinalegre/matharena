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

      <div class="navbar__user">
        <button class="navbar__user-badge" id="user-menu-button">
          M
        </button>

        <div class="user-menu" id="user-menu" hidden>
          <a href="/profile">Profile</a>
          <button type="button" id="logout">
            Log out
          </button>
        </div>
      </div>
      <div id="nav-overlay" class="navbar__overlay"></div>
    </header>
  );
};
