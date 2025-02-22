// import { processClapsButton } from "../clapsButton/clapsButton.ts";

document.querySelectorAll(".itemSummaryBrowser").forEach((element) => {
	const randomButton = element.querySelector(
		"button.itemSummaryBrowserRandomButton",
	) as HTMLButtonElement | null;

	randomButton?.addEventListener("click", () => {
		element.setAttribute("aria-busy", "true");
		// simulate a delay
		setTimeout(() => element.setAttribute("aria-busy", "false"), 1000);
	});
});
