import { add, span, div, a, li, ul } from '../../js/framework/h';
import { TogglerButton } from "../togglerButton/togglerButton";

const slugify = (text: string) => text.toLowerCase().replace(/(\s|\.)+/g, "-");

const sortElementsByPosition = (a: string, b: string) =>
	(document.getElementById(a)?.getBoundingClientRect().top ?? 0) -
	(document.getElementById(b)?.getBoundingClientRect().top ?? 0);

const setOrUseId = (element: HTMLElement) => {
	const id = element.getAttribute("id");
	if (id != null && id !== "") {
		return id;
	}
	const generatedId = "h-" + slugify(element.innerText);
	element.setAttribute("id", generatedId);
	return generatedId;
};

const clickButtonIfFound = (element: HTMLElement) => {
	const button = element &&
		Array.from(element.children).find((child) =>
			child.matches('button[aria-expanded="false"]')
		) as HTMLButtonElement | null;
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

const processArticleToc = (root: HTMLElement) => {
	if (root.classList.contains("isJSProcessed")) {
		return;
	}

	root.classList.add("isJSProcessed");

	/*****************************************************************************
	 * Handle creating headinds
	 */
	let lastHeading: HTMLLIElement | HTMLUListElement | null = null;
	const headings = Array.from(
		document.querySelectorAll<HTMLHeadingElement>(
			"main h1, main h2, .contributeBlockWrapper h1",
		),
	);
	const headingIndicesById = headings
		.map((heading) => {
			const id = setOrUseId(heading);
			const level = parseInt(heading.tagName.replace("H", ""), 10);

			const listItem = li(
				{
					class: [
						CLASS_PREFIX + CLASS_LIST_ITEM_LEVEL_PREFIX + level,
						CLASS_PREFIX + CLASS_LIST_ITEM,
					],
				},
				a({
					href: `#${id}`,
					class: [
						...Array.from(heading.classList).filter((c) =>
							c.toLowerCase().includes("icon")
						),
						CLASS_PREFIX + CLASS_ANCHOR_LINK,
						CLASS_PREFIX + CLASS_ANCHOR_LINK_LEVEL_PREFIX +
						heading.tagName,
					],
				}, heading.textContent),
			);

			if (level === 1) {
				lastHeading = listItem;
				add(root, listItem);
			} else {
				if (lastHeading) {
					if (lastHeading.tagName === "LI") {
						const divId = `hsub-${id}`;

						const revealButton = TogglerButton(
							{
								ariaControls: divId,
								class: CLASS_PREFIX + CLASS_FOLD_UNFOLD_BUTTON
							}
							,
							span({
								class: "whenNotToggled",
							}, BUTTON_TEXT_CLOSED),
							span({
								class: "whenToggled",
							}, BUTTON_TEXT_OPEN),
						);

						const list = ul({
							class: CLASS_PREFIX + CLASS_SUBHEADINGS_LIST,
						});

						const listWrapper = div({
							id: divId,
							class: CLASS_PREFIX +
								CLASS_SUBHEADINGS_LIST_CONTAINER,
						}, list);

						add(listWrapper, list);
						add(lastHeading, revealButton, listWrapper)

						lastHeading.classList.add(CLASS_HAS_CHILDREN);

						lastHeading = list;
					}
					lastHeading.appendChild(listItem);
				}
			}
			return id;
		})
		.reverse();

	const active: string[] = [];
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
					if (!anchor) {
						continue;
					}
					anchor.classList.add(CLASS_ANCHOR_SCROLLED_PAST);
					if (id === last) {
						const li = anchor.parentElement;
						if (!li) {
							continue;
						}
						li.classList.add(CLASS_CURRENT_LIST_ITEM);
						if (li.classList.contains(CLASS_HAS_CHILDREN)) {
							clickButtonIfFound(li);
						} else {
							const parentLi = (li.parentNode as HTMLUListElement)
								.closest("li");
							parentLi && clickButtonIfFound(parentLi);
						}
					}
				} else {
					root
						.querySelector<HTMLAnchorElement>(`[href="#${id}"]`)
						?.classList.remove(CLASS_ANCHOR_SCROLLED_PAST);
				}
			}
		},
		{ rootMargin: "0% 0% -10% 0%" },
	);
	headings.forEach((h) => observer.observe(h));
};

document.querySelectorAll<HTMLElement>('[data-is="article-toc"]').forEach(
	processArticleToc,
);

const processNavigationBehavior = (button: HTMLButtonElement) => {
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
	.querySelectorAll<HTMLButtonElement>(
		"#tableOfContents button.tableOfContentsToggleButton",
	)
	.forEach(processNavigationBehavior);
