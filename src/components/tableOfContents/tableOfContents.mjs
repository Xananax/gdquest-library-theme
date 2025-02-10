import { TogglerButton } from "../togglerButton/togglerButton.mjs";

const slugify = (text) => text.toLowerCase().replace(/(\s|\.)+/g, "-");

const sortElementsByPosition = (a, b) =>
	(document.getElementById(a)?.getBoundingClientRect().top ?? 0) -
	(document.getElementById(b)?.getBoundingClientRect().top ?? 0);

const setOrUseId = (element) => {
	const id = element.getAttribute("id");
	if (id != null && id !== "") {
		return id;
	}
	const generatedId = "h-" + slugify(element.innerText);
	element.setAttribute("id", generatedId);
	return generatedId;
};

const clickButtonIfFound = (element) => {
	const button =
		element &&
		Array.from(element.children).find((child) =>
			child.matches('button[aria-expanded="false"]'),
		);
	if (button != null) {
		button.click();
	}
};

const CLASS_PREFIX = "tableOfContents";
const BUTTON_TEXT_CLOSED = "unfold subreadings";
const BUTTON_TEXT_OPEN = "fold subreadings";
const CLASS_HAS_CHILDREN = "hasSubheadings";
const CLASS_ANCHOR_SCROLLED_PAST = "isActive";
const CLASS_CURRENT_LIST_ITEM = "isCurrent";
const CLASS_SUBHEADINGS_LIST = "SubheadingsList";
const CLASS_SUBHEADINGS_LIST_CONTAINER = "SubheadingsContainer";
const CLASS_ANCHOR_LINK = "Anchor";
const CLASS_ANCHOR_LINK_LEVEL_PREFIX = "AnchorLinkTo";
const CLASS_LIST_ITEM = "ListItem";
const CLASS_LIST_ITEM_LEVEL_PREFIX = "ItemLevel";
const CLASS_FOLD_UNFOLD_BUTTON = "FoldUnfoldButton";

const processArticleToc = (root) => {
	if (root.classList.contains("isJSProcessed")) {
		return;
	}

	root.classList.add("isJSProcessed");

	/*****************************************************************************
	 * Handle creating headinds
	 */
	let lastHeading = null;
	const headings = Array.from(
		document.querySelectorAll("main h1, main h2, .contributeBlockWrapper h1"),
	);
	const headingIndicesById = headings
		.map((heading, index) => {
			const id = setOrUseId(heading);
			const level = parseInt(heading.tagName.replace("H", ""), 10);

			const a = document.createElement("a");
			a.href = `#${id}`;
			a.textContent = heading.textContent;
			a.classList.add(
				...Array.from(heading.classList).filter((c) =>
					c.toLowerCase().includes("icon"),
				),
				CLASS_PREFIX + CLASS_ANCHOR_LINK,
				CLASS_PREFIX + CLASS_ANCHOR_LINK_LEVEL_PREFIX + heading.tagName,
			);

			const li = document.createElement("li");
			li.classList.add(
				CLASS_PREFIX + CLASS_LIST_ITEM_LEVEL_PREFIX + level,
				CLASS_PREFIX + CLASS_LIST_ITEM,
			);
			li.appendChild(a);

			if (level === 1) {
				lastHeading = li;
				root.appendChild(li);
			} else {
				if (lastHeading) {
					if (lastHeading.tagName === "LI") {
						const span1 = document.createElement("span");
						span1.classList.add("whenNotToggled");
						span1.textContent = BUTTON_TEXT_CLOSED;

						const span2 = document.createElement("span");
						span2.classList.add("whenToggled");
						span2.textContent = BUTTON_TEXT_OPEN;

						const divId = `hsub-${id}`;

						const button = TogglerButton(divId, span1, span2);
						button.classList.add(CLASS_PREFIX + CLASS_FOLD_UNFOLD_BUTTON);

						const ul = document.createElement("ul");
						ul.classList.add(CLASS_PREFIX + CLASS_SUBHEADINGS_LIST);

						const div = document.createElement("div");
						div.setAttribute("id", divId);
						div.classList.add(CLASS_PREFIX + CLASS_SUBHEADINGS_LIST_CONTAINER);
						div.appendChild(ul);

						lastHeading.appendChild(button);
						lastHeading.classList.add(CLASS_HAS_CHILDREN);
						lastHeading.appendChild(div);

						lastHeading = ul;
					}
					lastHeading.appendChild(li);
				}
			}
			return id;
		})
		.reverse();

	const active = [];
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.intersectionRatio > 0) {
					active.push(entry.target.id);
				} else {
					const index = active.indexOf(entry.target.id);
					if (index > -1) {
						active.splice(index, 1);
					}
				}
			});
			if (active.length === 0) {
				return;
			}
			const last = active.sort(sortElementsByPosition).at(-1);
			let found = false;
			root
				.querySelectorAll(`.${CLASS_CURRENT_LIST_ITEM}`)
				.forEach((el) => el.classList.remove(CLASS_CURRENT_LIST_ITEM));
			for (const id of headingIndicesById) {
				if (found || id === last) {
					found = true;
					const anchor = root.querySelector(`[href="#${id}"]`);
					anchor.classList.add(CLASS_ANCHOR_SCROLLED_PAST);
					if (id === last) {
						const li = anchor.parentElement;
						li.classList.add(CLASS_CURRENT_LIST_ITEM);
						if (li.classList.contains(CLASS_HAS_CHILDREN)) {
							clickButtonIfFound(li);
						} else {
							const parentLi = li.parentNode.closest("li");
							clickButtonIfFound(parentLi);
						}
					}
				} else {
					root
						.querySelector(`[href="#${id}"]`)
						.classList.remove(CLASS_ANCHOR_SCROLLED_PAST);
				}
			}
		},
		{ rootMargin: "0% 0% -10% 0%" },
	);
	headings.forEach((h) => observer.observe(h));
};

document.querySelectorAll('[data-is="article-toc"]').forEach(processArticleToc);

const processNavigationBehavior = (button) => {
	// By default, the navigation is shown until the toggle is pressed, but on mobile,
	// the navigation is hidden by default.
	// We will do a media query that checks if there's enough space for the navigation to be shown.
	// If not, we programmatically press the toggle button to hide the navigation.

	if (!button || button.classList.contains("isJSProcessed")) {
		return;
	}
	button.classList.add("isJSProcessed");

	const mediaQuery = window.matchMedia("(max-width: 1800px)");
	if (mediaQuery.matches) {
		button.click();
	}
};

document
	.querySelectorAll("#tableOfContents button.tableOfContentsToggleButton")
	.forEach(processNavigationBehavior);
