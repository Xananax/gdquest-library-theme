const wasProcessedClass = "isJSProcessed";

const processCallout = (callout) => {
	if (callout.classList.contains(wasProcessedClass)) {
		return;
	}
	callout.classList.add(wasProcessedClass);
	const titles = callout.querySelectorAll("dt");
	titles.forEach((title) => {
		const content = title.nextElementSibling;
		const id = content.id || `callout-${Math.random().toString(36).slice(2)}`;
		if (!content.id) {
			content.id = id;
		}
		const isOpen = title.hasAttribute("data-open");
		const button = document.createElement("button");
		button.setAttribute("aria-expanded", isOpen ? "true" : "false");
		button.setAttribute("aria-controls", id);
		button.setAttribute("aria-label", "Toggle callout");
		button.setAttribute("type", "button")
		button.textContent = title.textContent;
		title.textContent = "";
		if (!isOpen) {
			content.setAttribute("aria-hidden", "true");
			title.setAttribute("data-closed", "");
		}
		title.appendChild(button);

		button.addEventListener("click", () => {
			const shouldOpen = button.getAttribute("aria-expanded") !== "true";
			if (shouldOpen) {
				button.setAttribute("aria-expanded", "true");
				content.setAttribute("aria-hidden", "false");
				title.removeAttribute("data-closed");
			} else {
				button.setAttribute("aria-expanded", "false");
				content.setAttribute("aria-hidden", "true");
				title.setAttribute("data-closed", "");
			}
		});
	});
};

document
	.querySelectorAll('[data-is="collapsible-list"]')
	.forEach(processCallout);
