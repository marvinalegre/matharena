import { FC } from "hono/jsx";

type NavbarProps = {
  currentPath: string;
  username?: string | null;
};

export const Navbar: FC<NavbarProps> = ({ currentPath, username }) => {
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
          aria-current={currentPath === "/leaderboard" ? "page" : undefined}
        >
          Leaderboard
        </a>

        {!username && <a href="/login">Log in</a>}
      </nav>

      {username && (
        <div class="navbar__user">
          <button class="navbar__user-badge" id="user-menu-button">
            {username[0].toUpperCase()}
          </button>

          <div class="user-menu" id="user-menu" hidden>
            <a href={`/${username}`}>{username}</a>
            <button
              fx-action="/logout"
              fx-method="post"
              type="button"
              id="logout"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      <div id="nav-overlay" class="navbar__overlay"></div>
    </header>
  );
};
