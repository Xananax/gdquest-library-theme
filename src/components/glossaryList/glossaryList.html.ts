import { tmpl, ComponentString } from "../../depsServer.ts";
const { ul, ol, li, h2, section, a } = tmpl;
import { glossaryListTerms } from "./glossaryListTerms.ts";


export const GlossaryList: ComponentString = () =>
  section(
    { className: "glossaryList" },
    ol(
      { role: "list", "aria-label": "Glossary definitions" },
      glossaryListTerms.map(([letter, entries]) => {
        return li(
          {
            className: `glossarySection glossarySectionLetter-${letter}`,
            dataLetter: letter,
            dataHas: entries.length
          },
          h2(
            { id: `glossary-letter-${letter}` },
            a({ href: `#glossary-letter-${letter}` }, letter.toUpperCase())
          ),
          ul(
            {
              role: "list",
              "aria-label": `Definitions starting with the letter ${letter}`,
            },
            entries.map(([term, id]) =>
              li(null, a({ href: `/glossary/${id}` }, term))
            )
          )
        );
      })
    )
  );
