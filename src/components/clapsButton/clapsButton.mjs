import { isHTMLElement } from "../../utils/utils.mjs";

function formatNumber(number) {
	return number.toLocaleString("en-US", {
		maximumFractionDigits: 2,
		notation: "compact",
		compactDisplay: "short",
	});
}

const clapsOnPage = new Set();

const augmentedButton = {
	getAmount() {
		return parseInt(
			this.querySelector(".clapsButtonAmountTotal").textContent ?? "0",
			10,
		);
	},
	setAmount(newAmount) {
		this.querySelector(".clapsButtonAmountTotal").textContent = `${newAmount}`;
		this.querySelector(".clapsButtonAmountAbbreviated").textContent =
			formatNumber(newAmount);
	},
	increaseAmount() {
		this.setAmount(this.getAmount() + 1);
		this.setAttribute("aria-pressed", "true");
	},
	syncAmount() {
		this.setAmount(this.getAmount());
	},
};

function increaseButtonsAmount() {
	clapsOnPage.forEach((button) => button.increaseAmount());
}

/**
 * @param {HTMLButtonElement|null} button?
 */
export function processClapsButton(button) {
	if (button.classList.contains("isJSProcessed")) {
		return;
	}

	button.classList.add("isJSProcessed");

	Object.assign(button, augmentedButton);

	button.addEventListener("click", increaseButtonsAmount);

	button.syncAmount();
	button.addEventListener("animationend", () => {
		button.setAttribute("aria-pressed", "false");
	});

	clapsOnPage.add(button);
}

document.querySelectorAll("button.clapsButton").forEach(processClapsButton);
