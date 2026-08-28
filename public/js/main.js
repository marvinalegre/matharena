document.body.addEventListener("fx:after", (evt) => {
  const redirect = evt.detail.cfg.response.headers.get("FX-Redirect");
  if (redirect) {
    window.location.href = redirect;
  }

  const isCorrect = evt.detail.cfg.response.headers.get("MA-isCorrect");
  if (isCorrect === "true") {
    console.log("hit");
  } else {
    console.log("boo");
  }
});
