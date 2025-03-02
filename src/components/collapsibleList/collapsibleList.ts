import { add, button } from '../../js/deps.ts';

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

const processCallout = (collapsiblesList: HTMLDListElement) => {
	if (collapsiblesList.classList.contains(wasProcessedClass)) {
		return;
	}
	collapsiblesList.classList.add(wasProcessedClass);
	const captions = collapsiblesList.querySelectorAll<HTMLElement>("dt");

	captions.forEach((caption) => {
		const content = caption.nextElementSibling as HTMLElement | null;
		if (!content) {
			return;
		}
		const id = content.id ||
			`collapsible-${Math.random().toString(36).slice(2)}`;
		if (!content.id) {
			content.id = id;
		}
		const isOpen = caption.hasAttribute("data-open") &&
			caption.getAttribute("data-open") === "true";

		const revealBtn: RevealButtonElement = Object.assign(
			button({
				class: "collapsibleRevealButton",
				ariaExpanded: isOpen ? "true" : "false",
				ariaControls: id,
				ariaLabel: "Toggle callout",
				onclick: onRevealButtonClick,
				type: "button",
			}, caption.textContent),
			{ content, caption },
		);

		caption.textContent = "";

		if (!isOpen) {
			content.setAttribute("aria-hidden", "true");
			caption.setAttribute("data-closed", "");
		}

		add(caption, revealBtn);
	});
};

document
	.querySelectorAll<HTMLDListElement>('[data-is="collapsible-list"]')
	.forEach(processCallout);
