document.body.addEventListener("fx:after", (evt) => {
  const header = evt.detail.cfg.response.headers.get("FX-Trigger");

  if (!header) return;

  let data;

  try {
    data = JSON.parse(header);
  } catch {
    console.error("Invalid FX-Trigger header:", header);
    return;
  }

  const message = data.showToast;

  if (!message) return;

  const container = document.querySelector("#toast-container");
  if (!container) return;

  container.replaceChildren();

  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML =
    message === "correct"
      ? 'CORRECT! <span class="toast-fire">🔥</span>'
      : "Wrong.";

  container.append(toast);

  setTimeout(() => {
    toast.classList.add("hide");

    toast.addEventListener(
      "animationend",
      () => {
        toast.remove();
      },
      { once: true },
    );
  }, 3000);
});
