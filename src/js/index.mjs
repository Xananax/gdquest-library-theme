import "../components/authForm/authForm.mjs";
import "../components/carousel/carousel.mjs";
import "../components/clapsButton/clapsButton.mjs";
import "../components/clipboardButton/clipboardButton.mjs";
import "../components/collapsibleList/collapsibleList.mjs";
import "../components/fontSizeResizer/fontSizeResizer.mjs";
import "../components/glossarySearch/glossarySearch.mjs";
import "../components/mainSearch/mainSearch.mjs";
import "../components/passwordField/passwordField.mjs";
import "../components/scrollingList/scrollingList.mjs";
import "../components/nodeFlashCardShuffler/nodeFlashCardShuffler.mjs";
import "../components/itemSummaryBrowser/itemSummaryBrowser.mjs";
import "../components/shareWidget/shareWidget.mjs";
import "../components/tableOfContents/tableOfContents.mjs";
import "../components/tabList/tabList.mjs";
import "../components/togglerButton/togglerButton.mjs";

/**/

/*
const mainElement = document.querySelector("main");

mainElement &&
  document.querySelectorAll("[popover]").forEach((element) => {
    element.addEventListener("toggle", (event) => {
      if (event.newState === "open") {
        mainElement.setAttribute("inert", "");
      } else {
        mainElement.removeAttribute("inert");
      }
    });
  });
/**/

document.querySelectorAll(".showWhenJSLoads").forEach((element) => {
	element.removeAttribute("hidden");
});

document
	.querySelectorAll(".makeUsableWhenJSLoads")
	.forEach((/** HTMLElement */ element) => {
		element.style.removeProperty("pointer-events");
	});
