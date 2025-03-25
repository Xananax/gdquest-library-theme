import { tmpl, type ComponentString } from "../../depsServer.ts";

const { footer, h3, span, a, ul, li, p } = tmpl;

const classPrefix = "mainPageFooter";

export const Footer = () => footer({className: classPrefix},
  ul({className: `${classPrefix}Wrapper`, role: "list"},
    li({className: `${classPrefix}Socials`},
      a({href: "#", className: `${classPrefix}SocialsLogo gdquestLogo`, ariaHidden: "true"},
        span(null, "GDQuest")
      ),
      p({className: `${classPrefix}SocialsBlurb`}, "On GDQuest, we help you become a game developer using Godot, the free and open-source game engine"),
      ul({className: `${classPrefix}SocialsLinks`}, 
        li(null, a({href: "https://twitter.com/NathanGDQuest", className: "socialLink"}, span(null, "Twitter"))),
        li(null, a({href: "https://www.youtube.com/channel/UCxboW7x0jZqFdvMdCFKTMsQ?sub_confirmation=1", className: "socialLink"}, span(null, "Youtube"))),
        li(null, a({href: "https://discord.gg/87NNb3Z", className: "socialLink"}, span(null, "Discord")))
      )
    ),
    li({className: `${classPrefix}MailingList`},
      h3({className: `${classPrefix}MailingListTitle`}, "Get the latest from GDQuest"),
      // {{ include "/src/components/mailingListCollector/mailingListCollector.vto" { inputid: "footer", callback: "https://www.gdquest.com" } }}
      p({className: `${classPrefix}MailingListDisclaimer`}, "By subscribing, you agree to receive the latest announcements, releases, and sales from GDQuest. Read our", a({href: "#"}, "privacy policy"))
    ),
    li({className: `${classPrefix}QuickLinks`},
      h3(null, "Quick Links"),
      ul(null,
        li(null, a({href: "https://school.gdquest.com/courses/learn_2d_gamedev_godot_4/learn_gdscript/learn_gdscript_app"}, "Learn to Code From Zero With Godot")),
        li(null, a({href: "https://school.gdquest.com/products/bundle_godot_4_starter_kit"}, "The Great Godot 4 Starter Kit")),
        // li(null, a({href: "#"}, "Schools & Educators")),
        li(null, a({href: "https://school.gdquest.com/products/godot-4-early-access"}, "See all"))
      )
    ),
    li({className: `${classPrefix}About`},
      h3(null, "About"),
      ul(null,
        li(null, a({href: "https://school.gdquest.com/about-us"}, "Who are we?")),
        li(null, a({href: "https://school.gdquest.com/about-us/terms-of-service"}, "Terms of Service")),
        li(null, a({href: "https://school.gdquest.com/about-us/privacy-policy"}, "Privacy Policy")),
        li(null, a({href: "https://school.gdquest.com/about-us/contact"}, "Contact"))
      )
    )
  )
)