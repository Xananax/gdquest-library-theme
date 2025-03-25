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
import { ClapsButton } from "../clapsButton/clapsButton.html.ts";
import { HeaderSiteSearch } from "../headerSiteSearch/headerSiteSearch.html.ts";
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

export interface OpenGraphTagsProps {
  title: string;
  description: string;
  siteUrl: string;
  cover: ImageResourceInfo;
}

export const openGraphTags = ({
  title,
  description,
  siteUrl,
  cover,
}: OpenGraphTagsProps) => [
  ...(title && [
    meta({ property: "og:title", content: title }),
    meta({ name: "twitter:title", content: title }),
  ]),
  ...(description && [
    meta({ name: "description", content: description }),
    meta({ name: "twitter:description", content: description }),
    meta({ property: "og:description", content: description }),
  ]),
  ...(siteUrl &&
    cover && [
      meta({ property: "og:image", content: `${siteUrl}/${cover.relPath}` }),
      meta({ name: "twitter:image", content: `${siteUrl}/${cover.relPath}` }),
      meta({ name: "twitter:card", content: "summary_large_image" }),
    ]),
  meta({ property: "og:type", content: "website" }),
].join("");