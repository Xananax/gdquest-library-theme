const baseFontSize = 15;
let currentFontSize = baseFontSize;

const setBaseFontSize = (size: number) => {
  currentFontSize = size;
  document.documentElement.style.setProperty("--base-font-size", `${size}px`);
};

const increaseFontSize = () => setBaseFontSize(currentFontSize + 1);
const decreaseFontSize = () => setBaseFontSize(currentFontSize - 1);
const resetFontSize = () => setBaseFontSize(baseFontSize);

document.querySelectorAll(".fontSizeResizer").forEach((element) => {
  const increaseButton = element.querySelector<HTMLButtonElement>(".fontSizeResizerIncrease");
  const decreaseButton = element.querySelector<HTMLButtonElement>(".fontSizeResizerDecrease");
  const resetButton = element.querySelector<HTMLButtonElement>(".fontSizeResizerReset");

  if(!increaseButton || !decreaseButton || !resetButton){
    return
  }

  increaseButton.addEventListener("click", increaseFontSize);
  decreaseButton.addEventListener("click", decreaseFontSize);
  resetButton.addEventListener("click", resetFontSize);
});
