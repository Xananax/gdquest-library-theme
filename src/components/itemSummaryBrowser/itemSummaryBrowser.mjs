import { processClapsButton } from "../clapsButton/clapsButton.mjs";

document.querySelectorAll(".itemSummaryBrowser").forEach((element) => {
	const browseButton = element.querySelector(
		"button.itemSummaryBrowserBrowseButton",
	);
	const randomButton = element.querySelector(
		"button.itemSummaryBrowserRandomButton",
	);
	randomButton.addEventListener("click", () => {
		element.setAttribute("aria-busy", "true");
		// simulate a delay
		setTimeout(() => element.setAttribute("aria-busy", "false"), 1000);
	});
});
