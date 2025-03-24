import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { ItemCard } from "../itemCard/itemCard.html.ts";
const { h2, p, a, span, button, section, form, input, ul, li } = tmpl;

export const HeaderSiteSearch = () => form(
  {
    action: "https://www.gdquest.com/search/",
    method: "get",
    className: "headerSiteSearch"
  },
  input(
    {
      type: "search",
      name: "s",
      placeholder: "Search",
      className: "headerSiteSearchInput"
    }),
  button(
    {
      type: "submit",
      className: "headerSiteSearchButton"
    },
    span(null, "search")
  )
)
