import { debounce } from "../../js/framework/debounce.ts";

/**
 * Enhances a grid container with slider functionality
 * @param slider the main container element
 */
function initGridSlider(slider: Element) {
  if(slider.classList.contains('isJSProcessed')){
    return
  }
  slider.classList.add('isJSProcessed')

  const grid = slider.querySelector<HTMLElement>(".gridItemsList")
  const controls = slider.querySelector<HTMLElement>(".scrollingListControls")
  const prevButton = slider.querySelector<HTMLButtonElement>(".scrollingListControlsPrevious")
  const nextButton = slider.querySelector<HTMLButtonElement>(".scrollingListControlsNext")

  if(!grid || !controls || !prevButton || !nextButton){
    return
  }

  let carouselWidth = 0;
  let pages = 0;
  let currentPage = 0;

  const init = () => {
    controls.removeAttribute("hidden");
    slider.classList.add("isScrolling");
    slider.ariaRoleDescription = "carousel";

    prevButton.addEventListener("click", () => navigate(-1));
    nextButton.addEventListener("click", () => navigate(1));

    window.addEventListener("resize", debounce(calculateDimensions));

    grid.addEventListener("scrollend", updateButtonState);

    calculateDimensions();
  }

  const calculateDimensions = () => {
    carouselWidth = grid.offsetWidth;
    pages = Math.ceil(grid.scrollWidth / carouselWidth);
    currentPage = Math.floor(grid.scrollLeft / grid.offsetWidth);
    updateButtonState();
    navigateToPage(currentPage);
  }

  const navigate = (direction: number) => {
    const nextPage = (currentPage + direction) % pages;
    navigateToPage(nextPage);
  }

  const navigateToPage = (pageNumber: number) => {
    currentPage = pageNumber;
    grid.scrollLeft = pageNumber * carouselWidth;
  }

  const updateButtonState = () => {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages - 1;
  }

  init();
}

document.querySelectorAll(".scrollingList").forEach(initGridSlider);
