import { tmpl, ComponentString } from "../../depsServer.ts";
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

const classPrefix = "itemPageMeta";

export interface ItemPageMetaProps {
  showTeachingMethodLink: boolean;
  staticRoot: string;
  discord_invite: string;
}

export const ItemPageMeta: ComponentString<ItemPageMetaProps> = ({
  staticRoot,
  showTeachingMethodLink,
  discord_invite,
}) =>
  div(
    { className: classPrefix },
    section(
      { className: `${classPrefix}Links` },
      h4(
        null,
        span(null, "More on ", a({ href: "search.vto" }, `"3D"`)),
        ul(
          null,
          li(
            null,
            span(null, "In the library"),
            ul(
              null,
              li(
                null,
                em(null, "Glossary Entry:"),
                a({ href: "item.vto" }, `"Character Controller"`)
              ),
              li(
                null,
                a(
                  { href: "item.vto" },
                  `"3D character Movement in Godot in 6 minutes"`
                )
              )
            ),
            li(
              null,
              span(null, "In GDSchool"),
              ul(
                null,
                li(
                  null,
                  ol(
                    null,
                    li(
                      null,
                      a(
                        { href: "#" },
                        em(null, "M9.L2:"),
                        " Character controller"
                      )
                    ),
                    li(null, a({ href: "#" }, "Top Down Movement")),
                    li(null, a({ href: "#" }, "Pick Up Gamedev From Zero"))
                  ),
                  li(
                    null,
                    ol(
                      null,
                      li(
                        null,
                        a(
                          { href: "#" },
                          em(null, "M3.L4:"),
                          " Coding player movement"
                        )
                      ),
                      li(null, a({ href: "#" }, "Gobot the Sorcerer")),
                      li(
                        null,
                        a({ href: "#" }, "Learn 3D Gamedev Accross 3 genres")
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        PromoGDSchool({ staticRoot }),
        showTeachingMethodLink &&
          a(
            { href: "#", className: "gdquestTeachingMethod" },
            span(null, "LEARN MORE ABOUT GDQUEST'S UNIQUE TEACHING METHOD!")
          ),
        discord_invite && ItemDiscordInvite({ discord_invite })
      )
    )
  );

