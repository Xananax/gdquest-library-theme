import { HeaderSiteSearch } from "./components/headerSiteSearch/headerSiteSearch.html.ts";
import { Footer } from "./components/footer/footer.html.ts";
import { tmpl, ComponentString, ValidChild } from "./depsServer.ts";
import {
  openGraphTags,
  OpenGraphTagsProps,
} from "./components/openGraphTags/openGraph.html.ts";
const { head, title, meta, link, script, body, header } = tmpl;

export interface BaseProps {
  pageTitle: string;
  cssUrl: string;
  headJsUrl: string;
  bodyclass: string;
  content: ComponentString;
  jsUrl: string;
  openGraphProps: OpenGraphTagsProps;
}

export const Base = (
  {
    pageTitle,
    cssUrl,
    headJsUrl,
    bodyclass,
    jsUrl,
    openGraphProps,
  }: BaseProps,
  ...children: ValidChild[]
) =>
  `<!doctype html>` +
  [
    head(
      null,
      title(null, `${pageTitle} | GDQuest`),
      meta({ charset: "UTF-8" }),
      link({ rel: "stylesheet", href: cssUrl }),
      script({ src: headJsUrl, type: "module" }),
      meta({
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      }),
      openGraphTags(openGraphProps)
    ),
    body(
      { className: bodyclass },
      header({ className: "mainNavContainer" }, HeaderSiteSearch()),
      ...children,
      Footer(),
      script({ src: jsUrl, type: "module" })
    ),
  ].join("");
