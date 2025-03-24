import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
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
} = tmpl;

const classPrefix = "itemCard";

export const ItemCard = () =>
  li(
    {
      className: classPrefix,
      role: "group",
      ariaLabel: "1 of 4",
      ariaRoledescription: "item card",
    },
    div(
      { className: `${classPrefix}Cover` },
      img({ src: "components/itemCard/cover.jpeg", alt: "" }),
      div(
        { className: `${classPrefix}CoverNoImage`, ariaHidden: "true" },
        span({ className: `${classPrefix}CoverNoImageMainTitle` }, "inputs"),
        span({ className: `${classPrefix}CoverNoImageSubTitle` }, "cheatsheet")
      )
    ),
    h4(
      { className: `${classPrefix}Header` },
      a({ href: "item.vto" }, "Code a Third Person 3D Character Controller")
    ),
    dl(
      null,
      div(
        null,
        dt(null, "Type"),
        dd(null, a({ href: "search.vto" }, "Learning Resource"))
      ),
      div(
        null,
        dt(null, "Format"),
        dd(null, a({ href: "search.vto" }, "Video"))
      ),
      div(
        null,
        dt(null, "Version"),
        dd(null, a({ href: "search.vto" }, "Godot 4"))
      ),
      div(
        null,
        dt(null, "Tags"),
        dd(
          null,
          ul(
            { className: `${classPrefix}TagsList`, role: "list" },
            li(null, a({ href: "search.vto" }, "Tutorial")),
            li(null, a({ href: "search.vto" }, "3D")),
            li(null, a({ href: "search.vto" }, "Character Controller"))
          )
        )
      )
    )
  );
