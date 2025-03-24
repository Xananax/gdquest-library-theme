import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
const { h3, a, span, button, section, form, input, ul, li } = tmpl;

export const GlossarySearch: ComponentString = () =>
  section(
    { className: "glossarySearch" },
    h3(null, "Search Glossary Terms"),
    form(
      null,
      input({ type: "search", placeholder: 'Search for a term. eg: "node"' }),
      button({ type: "submit" }, span(null, "Submit"))
    ),
    ul(
      { className: "glossarySearchJumpLinks", role: "list" },
      ...glossaryListTerms.map(([letter]) =>
        li(null, a({ href: `#glossary-letter-${letter}` }, letter))
      )
    )
  );