import { tmpl, ComponentString, ImageResourceInfo, ParsedDate } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { PromoGDSchool } from "../promoGDSchool/promoGDSchool.html.ts";
import { ItemDiscordInvite } from "../itemDiscordInvite/itemDiscordInvite.html.ts";
import { ClapsButton } from "../clapsButton/clapsButton.html.ts";
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
} = tmpl;

const classPrefix = 'itemSummaryCard';

interface ItemSummaryCardProps{
  date_modified: ParsedDate;
  cover: ImageResourceInfo;
  date_created: ParsedDate;
  claps: number
}

export const ItemSummaryCard: ComponentString<ItemSummaryCardProps> = ({ date_modified, cover, date_created, claps }) => {
  return div(
    { className: `${classPrefix}Wrapper` },
    article(
      { className: classPrefix },
      span({ className: `${classPrefix}Background`, ariaHidden: "true" }),
      h4({ className: `${classPrefix}Title` },
        a({ href: "" }, "Create your first 3D Game from Zero")
      ),
      h3({ className: `${classPrefix}Date` }, date_modified && date_modified.dateDDMMYYYY.toReversed().join("/")),
      cover && img(
        { className: `${classPrefix}Cover`, src: cover.newSrc, width: 500, alt: "" }
      ),
      dl({ className: `${classPrefix}Attributes` },
        div(
          {},
          dt({}, "Type"),
          dd({}, "Learning Resource")
        ),
        div(
          {},
          dt({}, "Format"),
          dd({}, "Video")
        ),
        div(
          {},
          dt({}, "Version"),
          dd({}, "Godot 4.x")
        ),
        div(
          {},
          dt({}, "Subject Tags"),
          dd({ className: `${classPrefix}AttributesTags` },
            ul({},
              li({}, a({}, "3D")),
              li({}, a({}, "Full Game"))
            )
          )
        )
      ),
      ul({ className: `${classPrefix}Features`, role: "list" },
        li({}, "Downloadable Demo"),
        li({}, "FAQ/Troubleshooting"),
        li({}, "Bonus")
      ),
      dl({ className: `${classPrefix}Licenses` },
        div(
          {},
          dt({ className: `${classPrefix}LicensesCodeLabel` }, "Code"),
          dd({},
            ul({ role: "list" },
              li({},
                a({ href: "https://www.tldrlegal.com/license/mit-license" }, "MIT")
              )
            )
          )
        ),
        div(
          {},
          dt({ className: `${classPrefix}LicensesAssetsLabel` }, "Assets"),
          dd({},
            ul({ role: "list" },
              li({},
                a({ href: "https://www.tldrlegal.com/license/creative-commons-attribution-4-0-international-cc-by-4" }, "CC By 4.0")
              )
            )
          )
        ),
        div(
          {},
          dt({ className: `${classPrefix}LicensesAllElseLabel` }, "All else"),
          dd({}, `Copyright 2016-${(new Date().getFullYear())}`, "GDQuest")
        )
      ),
      dl({ className: `${classPrefix}Dates` },
        dt({}, "Created"),
        dl({}, date_created && date_created.dateDDMMYYYY.toReversed().join("/")),
        dt({}, "Updated"),
        dl({}, date_modified && date_modified.dateDDMMYYYY.toReversed().join("/"))
      ),
      ClapsButton({ claps })
    )
  )
}