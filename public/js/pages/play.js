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
      : 'WRONG! <span class="toast-x">❌</span>';

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

document.addEventListener("fx:config", (evt) => {
  const cfg = evt.detail.cfg;
  const swap = cfg.swap;

  cfg.swap = (cfg) => {
    const parent = cfg.target.parentElement;

    if (/(before|after)(begin|end)/.test(swap)) {
      cfg.target.insertAdjacentHTML(swap, cfg.text);
      renderMathInElement(cfg.target);
    } else if (swap in cfg.target) {
      cfg.target[swap] = cfg.text;

      renderMathInElement(swap === "outerHTML" ? parent : cfg.target);
    } else if (swap !== "none") {
      throw swap;
    }
  };
});

// fixi disable elements extension
document.addEventListener("fx:init", (evt) => {
  if (evt.target.matches("[ext-fx-disable]")) {
    evt.target.addEventListener("fx:before", () => {
      const disableTargets = document.querySelectorAll(
        "[ext-fx-disable-target]",
      );
      disableTargets.forEach((target) => {
        target.disabled = true;
      });
      evt.target.addEventListener("fx:after", (afterEvt) => {
        if (afterEvt.target == evt.target) {
          disableTargets.forEach((target) => {
            target.disabled = false;
          });
        }
      });
    });
  }
});
