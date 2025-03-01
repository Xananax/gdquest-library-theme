import "../components/authForm/authForm.ts";
import "../components/carousel/carousel.ts";
import "../components/clapsButton/clapsButton.ts";
import "../components/clipboardButton/clipboardButton.ts";
import "../components/codeBlock/codeBlock.ts";
import "../components/collapsibleList/collapsibleList.ts";
import "../components/fontSizeResizer/fontSizeResizer.ts";
import "../components/glossarySearch/glossarySearch.ts";
import "../components/mainSearch/mainSearch.ts";
import "../components/passwordField/passwordField.ts";
import "../components/userMessages/userMessages.ts";
import "../components/scrollingList/scrollingList.ts";
import "../components/nodeFlashCardShuffler/nodeFlashCardShuffler.ts";
import "../components/itemSummaryBrowser/itemSummaryBrowser.ts";
import "../components/shareWidget/shareWidget.ts";
import "../components/tableOfContents/tableOfContents.ts";
import "../components/tabList/tabList.ts";
import "../components/togglerButton/togglerButton.ts";
import "./prism.js";

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
	.querySelectorAll<HTMLElement>(".makeUsableWhenJSLoads")
	.forEach((/** HTMLElement */ element) => {
		element.style.removeProperty("pointer-events");
	});
