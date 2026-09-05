document.body.addEventListener("fx:after", (evt) => {
  const redirect = evt.detail.cfg.response.headers.get("FX-Redirect");
  if (redirect) {
    window.location.href = redirect;
  }
});

const nav = document.querySelector(".navbar__nav");
const overlay = document.querySelector(".navbar__overlay");
const menuBtn = document.querySelector(".navbar__menu-btn");
menuBtn.addEventListener("click", () => {
  nav.classList.add("open");
  overlay.classList.add("show");
});
overlay.addEventListener("click", () => {
  nav.classList.remove("open");
  overlay.classList.remove("show");
});
