import { Signal, getClampedRandomInt } from "../../js/deps.ts";

const clapsOnPage = new Set<[Element, Element, Element]>();

const claps = Signal(0);
const clapped = Signal(0);

type ClapButton = HTMLButtonElement & { label: Element };

claps.on((amount) => {
  const formattedAmount = formatNumber(amount);
  clapsOnPage.forEach(([total, abbreviated, bubble]) => {
    total.textContent = `${amount}`;
    abbreviated.textContent = formattedAmount;
    bubble.textContent = clapped.get() > 0 ? `+${clapped.get()}` : "";
  });
});

function increase(this: ClapButton) {
  this.setAttribute("aria-pressed", "true");
  clapped.set(clapped.get() + 1);
  claps.set(claps.get() + 1);
  this.label.appendChild(createConfetti());
}

function formatNumber(number = 0) {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  });
}

document
  .querySelectorAll<ClapButton>("button.clapsButton")
  .forEach(function processClapsButton(button) {
    if (button.classList.contains("isJSProcessed")) {
      return;
    }

    button.classList.add("isJSProcessed");

    const total = button.querySelector(".clapsButtonAmountTotal");
    const abbreviated = button.querySelector(".clapsButtonAmountAbbreviated");
    const bubble = button.querySelector(".clapsButtonBubble");
    const label = button.querySelector(".clapsButtonLabel");

    if (!total || !abbreviated || !bubble || !label) {
      return;
    }

    clapsOnPage.add([total, abbreviated, bubble]);

    button.addEventListener(
      "animationend",
      (event) =>{
        if(event.animationName === "clapTotal"){
          button.setAttribute("aria-pressed", "false")
        }
      }
    );

    button.label = label;
    button.addEventListener("click", increase);
  });

const firstClapElement = clapsOnPage.values().next().value;
if (firstClapElement) {
  const [total] = firstClapElement;
  const amount = parseInt(total.textContent ?? "0", 10);
  claps.set(amount);
}

const createConfetti = () => {
  const randomRotationAngle = getClampedRandomInt(360) + "deg";

  const particlesContainer = document.createElement("span");
  particlesContainer.dataset.is = "confetti";
  particlesContainer.addEventListener("animationend", () =>
    particlesContainer.remove()
  );
  particlesContainer.style.transform = `rotate(${randomRotationAngle})`;

  let children = getClampedRandomInt(10, 5);

  particlesContainer.classList.add(`has-${children + 1}`);

  while (children-- >= 0) {
    const particle = document.createElement("span");
    particle.style.setProperty("--angle", getClampedRandomInt(25) + "deg");
    particle.style.setProperty(
      "--destination",
      getClampedRandomInt(55, 5) + "px"
    );
    particlesContainer.appendChild(particle);
  }

  return particlesContainer;
};
