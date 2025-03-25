import { ItemSummaryCard } from "./../itemSummaryCard/itemSummaryCard.html.ts";
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

const {
  h2,
  p,
  a,
  span,
  button,
  section,
  form,
  input,
  ul,
  li,
  img,
  div,
  h4,
  dl,
  dt,
  dd,
  ol,
  em,
} = tmpl;

const classPrefix = "itemSummaryBrowser";

export interface ItemSummaryBrowserProps {
  showItemSummaryCardButtons: boolean;
  // TODO: these should come from the current card, not props
  date_modified: ParsedDate;
  cover: ImageResourceInfo;
  date_created: ParsedDate;
  claps: number;
}

export const ItemSummaryBrowser: ComponentString<ItemSummaryBrowserProps> = ({
  showItemSummaryCardButtons,
  cover,
  date_created,
  date_modified,
  claps,
}) =>
  section(
    { class: classPrefix },
    div(
      { class: `${classPrefix}Display` },
      div({ class: `${classPrefix}DisplayLoading` }),
      ItemSummaryCard({
        date_modified,
        cover,
        date_created,
        claps,
      })
    ),
    showItemSummaryCardButtons &&
      div(
        { className: `${classPrefix}Buttons` },
        a(
          { class: `${classPrefix}BrowseButton`, href: "search.vto" },
          span({
            class: `${classPrefix}ButtonIcon ${classPrefix}BrowseButtonIcon`,
            "aria-hidden": true,
          }),
          span({ class: `${classPrefix}ButtonLabel` }, "Browse the library")
        ),
        button(
          { class: `${classPrefix}RandomButton` },
          span({
            class: `${classPrefix}ButtonIcon ${classPrefix}RandomButtonIcon`,
            "aria-hidden": true,
          }),
          span({ class: `${classPrefix}ButtonLabel` }, "Pull a random title")
        ),
        div(
          { dataIs: "noscript" },
          "To shuffle cards, javascript is required! Please enable it to get a random card"
        )
      )
  );
