function toggleButton(this: HTMLButtonElement) {
	const expanded = this.getAttribute("aria-expanded") === "true";
	this.setAttribute("aria-expanded", expanded ? "false" : "true");
	const targetElementID = this.getAttribute("aria-controls");
	const targetElement = targetElementID
		? document.getElementById(targetElementID)
		: null;
	if (!targetElement) {
		return;
	}
	const targetToggledClassName = this.getAttribute("data-toggled-class");
	if(targetToggledClassName){
	if (expanded) {
		targetElement.classList.remove(targetToggledClassName);
	} else {
		targetElement.classList.add(targetToggledClassName);
	}}
}
export const processTogglerButton = (button: HTMLButtonElement) => {
	if (
		!button ||
		!(button.tagName === "BUTTON") ||
		button.classList.contains("isJSProcessed")
	) {
		return;
	}
	if (!button.getAttribute("data-toggled-class")) {
		button.setAttribute("data-toggled-class", "isToggled");
	}
	button.addEventListener("click", toggleButton);
};

export const TogglerButton = (controls: string, ...children: Element[]) => {
	const button = document.createElement("button");
	button.setAttribute("aria-expanded", "false");
	button.setAttribute("aria-label", "Toggle content");
	button.setAttribute("data-is", "toggler-button");
	if (controls) {
		button.setAttribute("aria-controls", controls);
	}
	if (children && children.length) {
		button.append(...children);
	}
	processTogglerButton(button);
	return button;
};

document
	.querySelectorAll<HTMLButtonElement>("button[data-is='toggler-button']")
	.forEach(processTogglerButton);
