import { NodeFlashCard } from '../nodeFlashCard/nodeFlashCard.html.ts';
import { ThemeToggle } from './../themeToggle/themeToggle.html.ts';
import { tmpl, ComponentString, ImageResourceInfo, ParsedDate } from "../../depsServer.ts";
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
  noscript
} = tmpl;


const classPrefix = 'nodeFlashCardShuffler';

export const NodeFlashCardShuffler = () =>
  div({ className: classPrefix },
    div({ className: `${classPrefix}Wrapper` },
      h4({ className: `${classPrefix}Title` }, "Node Flashcards Shuffler"),
      noscript(null, "this shuffler runs in the client and depends on Javascript. It won't work with Javascript disabled!"),
      div({ className: `${classPrefix}Description` },
        p(null, "This feature of GDQuest's Free Library comes from", a({ href: "#" }, "Node Essentials")),
        p(null, "Node Essentials is GDQuest's best kept secret for intermediate and experienced gamedevs. It is a handy recipe book to quickly look up and recreate 100+ popular game mechanics using 40 of Godot's most powerful nodes.", a({ href: "#", className: `${classPrefix}DescriptionFeatureLink` }, "Check out Node Essentials."))
      ),
      button({ className: `${classPrefix}Button` },
        span(null, " Shuffle to get new node flashcards ")
      ),
      div({ className: `${classPrefix}ContentPane`, "aria-live": "polite", "aria-busy": "false" },
        ul({ className: `${classPrefix}Grid`, role: 'list' },
          NodeFlashCard(),
          NodeFlashCard(),
          NodeFlashCard()
        ),
        div({ className: `${classPrefix}Loading`, "ariaHidden": "true" })
      ),
      button({ className: `${classPrefix}Button` },
        span(null, " Shuffle to get new node flashcards ")
      )
    )
  )