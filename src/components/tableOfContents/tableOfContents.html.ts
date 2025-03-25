import {
  tmpl,
  ComponentString,
  ImageResourceInfo,
  ParsedDate,
} from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { PromoGDSchool } from "../promoGDSchool/promoGDSchool.html.ts";
import { ItemDiscordInvite } from "../itemDiscordInvite/itemDiscordInvite.html.ts";
import { HeaderSiteSearch } from "../headerSiteSearch/headerSiteSearch.html.ts";
import { ClapsButton } from "../clapsButton/clapsButton.html.ts";
import { ClipboardButton } from "../clipboardButton/clipboardButton.html.ts";
const { div, button, nav, ul, span } = tmpl;

const classPrefix = "tableOfContents";

export const TableOfContents = () =>
  div(
    {
      className: [classPrefix, "isToggled", "showWhenJSLoads"],
      id: "tableOfContents",
      hidden: true,
    },
    button(
      {
        className: `${classPrefix}ToggleButton`,
        ariaControls: "tableOfContents",
        dataIs: "toggler-button",
        ariaExpanded: "true",
      },
      span(null, "Toggle Table of Contents")
    ),
    div(
      {
        className: `${classPrefix}Container`,
      },
      nav(
        {
          className: `${classPrefix}Pane showWhenJSLoads`,
          hidden: true,
        },
        ul({
          dataIs: "article-toc",
          className: `${classPrefix}MainList`,
          role: "list",
        })
      )
    )
  );