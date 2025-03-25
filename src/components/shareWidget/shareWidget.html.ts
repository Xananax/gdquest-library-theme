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
  h3,
  em,
  article,
  nav,
  fieldset,
  legend,
  label,
  h5,
  noscript,
  meta,
} = tmpl;


const classPrefix = "shareWidget";

interface ShareWidgetProps{
  claps: number;
}

export const ShareWidget = ({claps}: ShareWidgetProps) => div({
  className: [classPrefix, `${classPrefix}Container`],
}, div({
  className: `${classPrefix}Content`,
}, ClapsButton({ claps }), span({
  className: `${classPrefix}Separator`,
  ariaHidden: "true",
}), ClipboardButton({
  className: "clipboardButton",
}, span({
  className: "clipboardButtonLabel",
}, "Copy URL to clipboard"))));