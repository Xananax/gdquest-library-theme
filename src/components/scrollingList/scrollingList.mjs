//@ts-check
import { debounce } from "../../utils/utils.mjs";
/**
 * Enhances a grid container with slider functionality
 * @param {HTMLElement} The main container element
 */
function initGridSlider(slider) {
  const grid = slider.querySelector(".gridItemsList");
  const controls = slider.querySelector(".scrollingListControls");
  /** @type HTMLButtonElement */
  const prevButton = slider.querySelector(".scrollingListControlsPrevious");
  /** @type HTMLButtonElement */
  const nextButton = slider.querySelector(".scrollingListControlsNext");

  let carouselWidth = 0;
  let pages = 0;
  let currentPage = 0;

  function init() {
    controls.removeAttribute("hidden");
    slider.classList.add("isScrolling");
    slider.ariaRoleDescription = "carousel";

    prevButton.addEventListener("click", () => navigate(-1));
    nextButton.addEventListener("click", () => navigate(1));

    let resizeTimeout = null;
    window.addEventListener("resize", debounce(calculateDimensions));

    grid.addEventListener("scrollend", updateButtonState);

    calculateDimensions();
  }

  function calculateDimensions() {
    carouselWidth = grid.offsetWidth;
    pages = Math.ceil(grid.scrollWidth / carouselWidth);
    currentPage = Math.floor(grid.scrollLeft / grid.offsetWidth);
    updateButtonState();
    navigateToPage(currentPage);
  }

  function navigate(direction) {
    nextPage = (currentPage + direction) % pages;
    navigateToPage(nextPage);
  }

  function navigateToPage(pageNumber) {
    currentPage = pageNumber;
    grid.scrollLeft = pageNumber * carouselWidth;
  }

  function updateButtonState() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages - 1;
  }

  init();
}

document.querySelectorAll(".scrollingList").forEach(initGridSlider);
