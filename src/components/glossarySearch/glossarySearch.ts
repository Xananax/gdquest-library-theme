document.querySelectorAll<HTMLAnchorElement>(".glossarySearchJumpLinks a").forEach((link) => {
	const href = link.getAttribute("href") ?? "";
	if (!document.getElementById(href.replace("#", ""))) {
		link.classList.add("disabled");
	}
});

document.querySelectorAll(".glossarySearch form").forEach((form) => {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
	});
});
