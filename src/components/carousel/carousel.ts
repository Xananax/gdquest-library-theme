// @ts-check
// deno-lint-ignore-file no-unused-labels
import { button, img, li, span } from "../../js/utils.ts";

const currentProps = {
  ariaCurrent: "true",
  ariaDisabled: "true",
};

const timerTime = 8000;

const setupCarousel = (carouselWrapper: HTMLElement) => {
  const slider = carouselWrapper.querySelector<HTMLElement>(
    ".carouselSlidesList",
  );

  if (!slider) {
    return;
  }

  const slides = Array.from(
    slider.querySelectorAll<HTMLDivElement>(".carouselSlidesListSlide"),
  ).map((slide) => {
    const category = slide.querySelector("h4")?.textContent ?? "";
    const title = slide.querySelector("h2")?.textContent ?? "";
    const thumbnail = slide.querySelector("img")?.src ?? "";
    return {
      category,
      title,
      thumbnail,
    };
  });

  const controller = (() => {
    const liveRegion = carouselWrapper.querySelector<HTMLElement>(
      ".carouselLiveRegion",
    );

    let currentSlide = Math.ceil(slider.scrollLeft / slider.offsetWidth) %
      slides.length;

    const nextSlide = () => updateSlider((currentSlide + 1) % slides.length);

    const prevSlide = () =>
      updateSlider((currentSlide - 1 + slides.length) % slides.length);

    const updateSlider = (nextSlide: number) => {
      if (nextSlide === currentSlide) {
        return;
      }
      slideButtons[currentSlide]?.setCurrent(false);
      slideButtons[nextSlide]?.setCurrent(true);
      currentSlide = nextSlide;
      slider.scrollLeft = slider.offsetWidth * currentSlide;
      if (liveRegion) {
        liveRegion.textContent = `Item ${currentSlide + 1} of ${slides.length}`;
      }
    };

    return {
      nextSlide,
      prevSlide,
      updateSlider,
      get currentSlide() {
        return currentSlide;
      },
    };
  })();

  handlePause: {
    const isReduced =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) != null &&
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReduced) {
      break handlePause;
    }
    const pauseToggleButton = carouselWrapper.querySelector<HTMLButtonElement>(
      ".carouselControlsButtonPlayToggle",
    );

    const pauseToggleButtonTextElement = pauseToggleButton?.querySelector<
      HTMLSpanElement
    >("span");

    if (!pauseToggleButton || !pauseToggleButtonTextElement) {
      break handlePause;
    }

    let pauseInterval: NodeJS.Timeout | null = null;
    let pauseRequested = false;

    const setPauseButton = (isPaused: boolean) => {
      if (!isPaused) {
        pauseToggleButton.classList.remove("buttonPlay");
        pauseToggleButton.classList.add("buttonPause");
        pauseToggleButtonTextElement.textContent = "Pause";
      } else {
        pauseToggleButtonTextElement.textContent = "Play";
        pauseToggleButton.classList.remove("buttonPause");
        pauseToggleButton.classList.add("buttonPlay");
      }
    };

    const startTimer = () => {
      clearInterval(pauseInterval as NodeJS.Timeout);
      if (pauseRequested) {
        return;
      }
      pauseInterval = setInterval(controller.nextSlide, timerTime);
      carouselWrapper.style.setProperty("--timer-time", `${timerTime}ms`);
      carouselWrapper.style.setProperty(
        "--timer-animation-name",
        "carouselProgressAnimation",
      );
    };
    const stopTimer = () => {
      carouselWrapper.style.setProperty("--timer-time", "0ms");
      carouselWrapper.style.setProperty("--timer-animation-name", "none");
      clearInterval(pauseInterval as NodeJS.Timeout);
      pauseInterval = null;
    };

    pauseToggleButton.addEventListener("click", () => {
      if (!pauseRequested) {
        setPauseButton(true);
        pauseRequested = true;
        stopTimer();
      } else {
        pauseRequested = false;
        setPauseButton(false);
      }
    });

    startTimer();
    setPauseButton(false);

    carouselWrapper.addEventListener("mouseenter", stopTimer);
    carouselWrapper.addEventListener("mouseleave", startTimer);
    carouselWrapper.addEventListener("focusin", stopTimer);
    carouselWrapper.addEventListener("focusout", startTimer);
  }

  const slideButtons = (() => {
    const carouselSlidesNavigationContainer = carouselWrapper.querySelector(
      ".carouselSlidesNavigation",
    );

    if (!carouselSlidesNavigationContainer) {
      return [];
    }

    const currentSlideAnnouncer = span(
      {
        class: "carouselSlideButtonCurrentTextAnnouncer",
      },
      "(Current Slide)",
    );

    const slideButtons = slides.map((slide, index) => {
      const isCurrent = index === controller.currentSlide;
      const slideButton = button(
        {
          class: "carouselSlidesNavigationButton",
          ...(isCurrent ? currentProps : {}),
        },
        span(
          { class: "carouselSlidesNavigationButtonLabel" },
          span(
            {
              class: "carouselSlidesNavigationButtonLabelCategory",
            },
            slide.category,
          ),
          span(
            {
              class: "carouselSlidesNavigationButtonLabelTitle",
            },
            slide.title,
          ),
        ),
        img({
          class: "carouselSlidesNavigationButtonThumbnail",
          src: slide.thumbnail,
          alt: "",
          ariaHidden: "true",
        }),
        isCurrent && currentSlideAnnouncer,
      ) as HTMLButtonElement & { setCurrent: (isCurrent: boolean) => void };
      slideButton.addEventListener(
        "click",
        () => controller.updateSlider(index),
      );
      carouselSlidesNavigationContainer.appendChild(li(slideButton));
      slideButton.setCurrent = (isCurrent) => {
        if (isCurrent) {
          slideButton.setAttribute("aria-current", "true");
          slideButton.setAttribute("aria-disabled", "true");
          slideButton.setAttribute("disabled", "true");
          slideButton.append(currentSlideAnnouncer);
        } else {
          slideButton.removeAttribute("aria-current");
          slideButton.removeAttribute("aria-disabled");
          slideButton.removeAttribute("disabled");
        }
      };
      return slideButton;
    });

    return slideButtons;
  })();

  setupNextPrevButtons: {
    carouselWrapper
      .querySelector(".buttonPrevious")?.addEventListener(
        "click",
        controller.prevSlide,
      );
    carouselWrapper
      .querySelector(".buttonNext")?.addEventListener(
        "click",
        controller.nextSlide,
      );
  }
};

document.querySelectorAll<HTMLElement>("section.carouselWrapper").forEach(
  setupCarousel,
);
