import {ul, li, button, span, div } from '../utils.mjs'

if (announceItem) {
  carousel.querySelector(".liveregion").textContent =
    "Item " + (new_current + 1) + " of " + slides.length;
}

ctrls.querySelector(".btn-prev").addEventListener("click", function () {
  prevSlide(true);
});

ctrls.querySelector(".btn-next").addEventListener("click", function () {
  nextSlide(true);
});

