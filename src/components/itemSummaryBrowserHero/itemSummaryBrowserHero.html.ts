import { ItemSummaryBrowser, type ItemSummaryBrowserProps } from './../itemSummaryBrowser/itemSummaryBrowser.html.ts';
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

// TODO: these properties should be injected by the card, not props
export const ItemSummaryBrowserHero:ComponentString<ItemSummaryBrowserProps> = (props) => 
  div(
    { class: 'itemSummaryBrowserHero' },
    ItemSummaryBrowser(props)
  )