//@ts-check
import { debounce } from "../../js/utils.ts";

/**
 * Enhances a grid container with slider functionality
 * @param {Element} slider the main container element
 */
function initGridSlider(slider) {
  if(slider.classList.contains('isJSProcessed')){
    return
  }
  slider.classList.add('isJSProcessed')

  const grid = /** @type HTMLElement */(slider.querySelector(".gridItemsList"));
  const controls = /** @type HTMLElement */(slider.querySelector(".scrollingListControls"));
  const prevButton = /** @type HTMLButtonElement */(slider.querySelector(".scrollingListControlsPrevious"));
  const nextButton = /** @type HTMLButtonElement */(slider.querySelector(".scrollingListControlsNext"));

  if(!grid || !controls || !prevButton || !nextButton){
    return
  }

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
    const nextPage = (currentPage + direction) % pages;
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
