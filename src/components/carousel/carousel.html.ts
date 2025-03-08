import { tmpl, type ComponentString } from "../../depsServer.ts";
import { CarouselSlideContent } from "../carouselSlideContent/carouselSlideContent.html.ts";
const { section, a, ul, li, button, div } = tmpl;

const slides = [
  {
    title: "Latest",
    caption: "Code a third person 3D character controller with smooth movement",
    src: "components/carousel/examples/card_image_1.jpg",
  },
  {
    title: "Trending",
    caption: "Create your first 2D game from zero in Godot 4",
    src: "components/carousel/examples/card_image_2.jpg",
  },
  {
    title: "Recommended",
    caption: "Take this interactive tour to learn Godot's interface",
    src: "components/carousel/examples/card_image_3.png",
  },
];

const classPrefix = "carousel";

export const Carousel: ComponentString = () =>
  section(
    {
      class: "carouselWrapper",
      role: "region",
      ariaLabel: "Recent News",
      ariaRoledescription: "carousel",
      tabIndex: -1,
    },
    a(
      { href: "#main", className: `${classPrefix}SkipToContent` },
      "Skip Slides"
    ),
    ul(
      {
        role: "group",
        className: [`${classPrefix}Controls`, `showWhenJSLoads`],
        hidden: true,
      },
      li(
        {},
        button(
          {
            type: "button",
            className: [`${classPrefix}ControlsButton`, `buttonPrevious`],
          },
          "Previous"
        )
      ),
      li(
        {},
        button(
          {
            type: "button",
            className: [`${classPrefix}ControlsButton`, `buttonNext`],
          },
          "Next"
        )
      ),
      li(
        {},
        button(
          {
            type: "button",
            className: [
              `${classPrefix}ControlsButton`,
              `${classPrefix}ControlsButtonPlayToggle`,
            ],
          },
          "Pause"
        )
      )
    ),
    ul({
      className: [`${classPrefix}SlidesNavigation`, `showWhenJSLoads`],
      role: "group",
      ariaLabel: "Choose Slide",
      hidden: true,
    }),
    div({
      className: [`${classPrefix}LiveRegion`, `showWhenJSLoads`],
      ariaLive: "polite",
      ariaAtomic: "true",
      hidden: true,
    }),
    ul(
      {
        role: "region",
        className: [`${classPrefix}SlidesList`],
        ariaLabel: "Slides",
      },
      ...slides.map((slide, index) =>
        CarouselItem(index, slides.length, CarouselSlideContent(slide))
      )
    )
  );

const CarouselItem = (index: number, maximum: number, content: string) =>
  li(
    {
      className: [`${classPrefix}SlidesListSlide`],
      role: "group",
      ariaLabel: `${index + 1} of ${maximum}`,
      ariaRoleDescription: "slide",
      ariaLabelledBy: `carousel_item-${index + 1}_heading`,
    },
    content
  );
