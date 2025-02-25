import van from "vanjs-core";

const { tags: { button } } = van;

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
	if (targetToggledClassName) {
		if (expanded) {
			targetElement.classList.remove(targetToggledClassName);
		} else {
			targetElement.classList.add(targetToggledClassName);
		}
	}
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

export const TogglerButton = (
	props: { "aria-controls": string } & Record<string, any>,
	...children: Element[]
) => {
	const toggleButton = button(
		{
			"aria-expanded": "false",
			"aria-label": "Toggle content",
			"data-is": "toggler-button",
			...props,
		},
		...children,
	);
	processTogglerButton(toggleButton);
	return toggleButton;
};

document
	.querySelectorAll<HTMLButtonElement>("button[data-is='toggler-button']")
	.forEach(processTogglerButton);
