import { tmpl } from "../../depsServer.ts";
import { ClipboardButton } from "./../clipboardButton/clipboardButton.html.ts";
const { section, h1, span, div, ul, li, a, p } = tmpl;

const classPrefix = "contributeBlock";

export const ContributeBlock = () =>
  div(
    { className: `${classPrefix}Wrapper` },
    section(
      { className: classPrefix, ariaRoledescription: "contribution links" },
      h1(
        {
          className: [`hasIconBefore`, `icon-github`],
          dataTocTitle: "Contribute to the Free Library",
        },
        "Contribute to GDQuest's Free Library"
      ),
      p(
        { className: `${classPrefix}Emphasized` },
        "There are multiple ways you can join our effort to create free and open source gamedev resources that are accessible to everyone!"
      ),
      ul(
        { role: "list" },
        li(
          null,
          p(
            null,
            "Sponsor this library by learning gamedev with us on",
            a(
              { href: "https://school.gdquest.com", className: `gdschoolLogo` },
              span(null, "GDSchool")
            )
          ),
          a(
            {
              href: "https://school.gdquest.com",
              className: `contributeBlockFooterLink contributeBlockFooterLinkLearnMore`,
            },
            span(null, "Learn More")
          )
        ),
        li(
          null,
          p(
            null,
            "Improve and build on assets or suggest edits on",
            a(
              { href: "https://github.com/gdquest", className: `githubLogo` },
              span(null, "Github")
            )
          ),
          a(
            {
              href: "https://github.com/gdquest",
              className: [
                `contributeBlockFooterLink`,
                `contributeBlockFooterLinkContribute`,
              ],
            },
            span(null, "Contribute")
          )
        ),
        li(
          null,
          p(
            null,
            "share this page and talk about GDQUest on",
            a(
              { className: `socialLink`, href: "https://reddit.com" },
              span(null, "Reddit")
            ),
            a(
              { className: `socialLink`, href: "https://youtube.com" },
              span(null, "Youtube")
            ),
            a(
              { className: `socialLink`, href: "https://twitter.com" },
              span(null, "Twitter")
            ),
            "…"
          ),
          ClipboardButton({
            className: [
              `contributeBlockFooterLink`,
              `contributeBlockFooterLinkShare`,
            ],
          })
        )
      )
    )
  );
