import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { ItemCard } from "../itemCard/itemCard.html.ts";
const { h2, p, a, span, button, section, form, input, ul, li } = tmpl;

export const GridItemsList = () => ul(
  {
    className: "gridItemsList",
    role: "group",
    ariaLabel: "Recent Releases Items",
    ariaRoledescription: "grid"
  },
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
  ItemCard(),
)