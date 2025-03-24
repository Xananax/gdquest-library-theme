import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { QuoteBubble } from "../quoteBubble/quoteBubble.html.ts";
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
  h5,
  strong,
} = tmpl;

const classPrefix = "promoGDSchool";

interface PromoGDSchoolProps {
  staticRoot: string;
}

export const PromoGDSchool: ComponentString<PromoGDSchoolProps> = ({
  staticRoot,
}) =>
  section(
    { className: classPrefix },
    h5(
      { className: `${classPrefix}Title` },
      "Become an Indie Gamedev with GDQuest!",
      span({ className: `${classPrefix}TitleLogo` }, span(null, "in GDSchool"))
    ),
    div(
      { className: `${classPrefix}Body` },
      QuoteBubble(
        {},
        p(
          null,
          "Don't stop here. Step-by-step tutorials are fun but they only take you so far."
        ),
        p(
          null,
          strong(
            null,
            "Try one of our proven study programs to become an independent Gamedev truly capable of realizing the games you’ve always wanted to make."
          )
        )
      ),
      ul(
        { className: `${classPrefix}BodyList`, role: "list" },
        li(
          null,
          a(
            {
              href: "https://school.gdquest.com/products/bundle_godot_4_starter_kit",
            },
            img({ src: `${staticRoot}starter-kit.png`, alt: "Starter Kit" })
          )
        ),
        li(
          null,
          a(
            {
              href: "https://school.gdquest.com/products/bundle_learn_gamedev_godot_4",
            },
            img({
              src: `${staticRoot}from-zero.png`,
              alt: "Learn Gamedev from Zero",
            })
          )
        )
      ),
      a(
        {
          href: "https://school.gdquest.com",
          className: `${classPrefix}BodyHighlightLink`,
        },
        "Check out GDSchool"
      )
    )
  );