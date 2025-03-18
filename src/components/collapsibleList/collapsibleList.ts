import { add } from "../../js/deps.ts";
import { makeRevealButton } from "../collapsibleElement/collapsibleElement.ts";

const wasProcessedClass = "isJSProcessed";

const processCallout = (collapsiblesList: HTMLDListElement) => {
  
  if (collapsiblesList.classList.contains(wasProcessedClass)) {
    return;
  }
  collapsiblesList.classList.add(wasProcessedClass);
  const captions = collapsiblesList.querySelectorAll<HTMLElement>("dt");

  captions.forEach((caption) => {
    const content = caption.nextElementSibling as HTMLElement | null;

    const revealButton = makeRevealButton(caption, content);

    if (!revealButton) {
      return;
    }

    caption.textContent = "";

    add(caption, revealButton);
  });
};

document
  .querySelectorAll<HTMLDListElement>('[data-is="collapsible-list"]')
  .forEach(processCallout);
