function unclickButton(button) {
	button.setAttribute("aria-pressed", "false");
}

function onButtonClick(event) {
	const value = this.getAttribute("data-clipboard");
	const clipboard =
		value === "currentURL" || value == null ? window.location.href : value;
	navigator.clipboard.writeText(clipboard);
	this.setAttribute("aria-pressed", "true");

	setTimeout(() => unclickButton(this), 2000);
}

const processClipboardButton = (button) => {
	if (button.classList.contains("isJSProcessed")) {
		return;
	}
	button.classList.add("isJSProcessed");
	button.addEventListener("click", onButtonClick);
};

document
	.querySelectorAll("button[data-is='clipboard-button']")
	.forEach(processClipboardButton);
