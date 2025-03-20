import { Signal } from "../../js/deps.ts";

const clapsOnPage = new Set<[Element, Element, Element]>();

const claps = Signal(0);
const clapped = Signal(0);

claps.on((amount) => {
  const formattedAmount = formatNumber(amount);
  clapsOnPage.forEach(([total, abbreviated, bubble]) => {
    total.textContent = `${amount}`;
    abbreviated.textContent = formattedAmount;
    bubble.textContent = clapped.get() > 0 ? `+${clapped.get()}` : "";
  });
});

function increase(this: HTMLButtonElement) {
  this.setAttribute("aria-pressed", "true");
  clapped.set(clapped.get() + 1);
  claps.set(claps.get() + 1);
}

function formatNumber(number = 0) {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  });
}

document
  .querySelectorAll("button.clapsButton")
  .forEach(function processClapsButton(button) {
    if (button.classList.contains("isJSProcessed")) {
      return;
    }

    button.classList.add("isJSProcessed");

    const total = button.querySelector(".clapsButtonAmountTotal");
    const abbreviated = button.querySelector(".clapsButtonAmountAbbreviated");
    const bubble = button.querySelector(".clapsButtonBubble");

    if (!total || !abbreviated || !bubble) {
      return;
    }

    clapsOnPage.add([total, abbreviated, bubble]);

    button.addEventListener(
      "animationend",
      () => button.setAttribute("aria-pressed", "false"),
    );

    button.addEventListener("click", increase);
  });

const firstClapElement = clapsOnPage.values().next().value;
if (firstClapElement) {
  const [total] = firstClapElement;
  const amount = parseInt(total.textContent ?? "0", 10);
  claps.set(amount);
}
