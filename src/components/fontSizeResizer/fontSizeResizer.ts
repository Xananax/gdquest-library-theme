const baseFontSize = 15;
let currentFontSize = baseFontSize;

const setBaseFontSize = (size) => {
  currentFontSize = size;
  document.documentElement.style.setProperty("--base-font-size", `${size}px`);
};

const increaseFontSize = () => setBaseFontSize(currentFontSize + 1);
const decreaseFontSize = () => setBaseFontSize(currentFontSize - 1);
const resetFontSize = () => setBaseFontSize(baseFontSize);

document.querySelectorAll(".fontSizeResizer").forEach((element) => {
  const increaseButton = element.querySelector(".fontSizeResizerIncrease");
  const decreaseButton = element.querySelector(".fontSizeResizerDecrease");
  const resetButton = element.querySelector(".fontSizeResizerReset");

  increaseButton.addEventListener("click", increaseFontSize);
  decreaseButton.addEventListener("click", decreaseFontSize);
  resetButton.addEventListener("click", resetFontSize);
});
