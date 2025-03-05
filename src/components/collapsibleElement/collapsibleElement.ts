import { add, button } from "../../js/deps.ts";

const wasProcessedClass = "isJSProcessed";

type RevealButtonElement = HTMLButtonElement & {
  content: HTMLElement;
  caption: HTMLElement;
};

function onRevealButtonClick(this: RevealButtonElement) {
  const shouldOpen = this.getAttribute("aria-expanded") !== "true";
  if (shouldOpen) {
    this.setAttribute("aria-expanded", "true");
    this.content.removeAttribute("aria-hidden");
    this.caption.removeAttribute("data-closed");
  } else {
    this.setAttribute("aria-expanded", "false");
    this.content.setAttribute("aria-hidden", "true");
    this.caption.setAttribute("data-closed", "");
  }
}

export const makeRevealButton = (
  summary?: HTMLElement | null,
  details?: HTMLElement | null
) => {
  if (!details || !summary) {
    return;
  }
  const id = details.id || `collapsible-${Math.random().toString(36).slice(2)}`;
  if (!details.id) {
    details.id = id;
  }
  const isOpen =
    summary.hasAttribute("data-open") &&
    summary.getAttribute("data-open") === "true";
  const revealBtn: RevealButtonElement = Object.assign(
    button(
      {
        class: "collapsibleRevealButton",
        ariaExpanded: isOpen ? "true" : "false",
        ariaControls: id,
        ariaLabel: "Toggle content",
        // @ts-expect-error impossible to type this
        onclick: onRevealButtonClick,
        type: "button",
      },
      summary.textContent
    ),
    { content: details, caption: summary }
  );

  if (!isOpen) {
    details.setAttribute("aria-hidden", "true");
    summary.setAttribute("data-closed", "");
  }

  return revealBtn;
};

document.querySelectorAll<HTMLElement>('[data-is-disclosure').forEach((el) => {
  if (el.classList.contains(wasProcessedClass)) {
    return;
  }
  el.classList.add(wasProcessedClass);
  const summary = el.querySelector<HTMLElement>(".disclosureSummary");
  const details = el.querySelector<HTMLElement>(".disclosureDetails");
  if (!summary || !details) {
    return;
  }
  const button = makeRevealButton(summary, details);
  if (!button) {
    return;
  }
  add(summary, button);
})