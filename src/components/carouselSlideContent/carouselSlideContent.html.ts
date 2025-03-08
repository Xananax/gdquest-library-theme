import { tmpl, type ComponentString } from "../../depsServer.ts";
const { h4, h2, img } = tmpl;

type CarouselSlideContentProps = {
  title: string;
  caption: string;
  src: string;
};

export const CarouselSlideContent: ComponentString<
  CarouselSlideContentProps
> = ({ title, caption, src }) =>
  [h4({}, title), h2({}, caption), img({ src, alt: title })].join("");
