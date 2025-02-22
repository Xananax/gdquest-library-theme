// slide cards after loading
// move loading outside of container without using display: none
//
document.querySelectorAll(".nodeFlashCardShuffler").forEach((element) => {
  const contentPane = element.querySelector<HTMLElement>(
    ".nodeFlashCardShufflerContentPane",
  );
  const buttons = element.querySelectorAll<HTMLElement>(
    "button.nodeFlashCardShufflerButton",
  );
  const grid = element.querySelector<HTMLElement>(".nodeFlashCardShufflerGrid");

  if(!contentPane || !grid){
    return
  }

  const loadNewCards = () => {
    contentPane.setAttribute("aria-busy", "true");
    buttons.forEach((button) => button.setAttribute("disabled", ""));
    setTimeout(() => {
      contentPane.setAttribute("aria-busy", "false");
      buttons.forEach((button) => button.removeAttribute("disabled"));
      grid.classList.add("slideIn");
    }, 3000);
  };

  grid.addEventListener("animationend", () => grid.classList.remove("slideIn"));

  buttons.forEach((button) => button.addEventListener("click", loadNewCards));
});
