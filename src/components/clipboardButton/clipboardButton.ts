function unclickButton(button: HTMLButtonElement) {
	button.setAttribute("aria-pressed", "false");
}

function onclipboardButtonClick(this: HTMLButtonElement, _event: Event) {
	const value = this.getAttribute("data-clipboard");
	const clipboard =
		value === "currentURL" || value == null ? window.location.href : value;
	navigator.clipboard.writeText(clipboard);
	this.setAttribute("aria-pressed", "true");

	setTimeout(() => unclickButton(this), 2000);
}

const processClipboardButton = (button: HTMLButtonElement) => {
	if (button.classList.contains("isJSProcessed")) {
		return;
	}
	button.classList.add("isJSProcessed");
	button.addEventListener("click", onclipboardButtonClick);
};

document
	.querySelectorAll<HTMLButtonElement>("button[data-is='clipboard-button']")
	.forEach(processClipboardButton);
