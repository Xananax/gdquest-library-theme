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
  nav
} = tmpl;

interface MainNavProps {
  mainNavLinks: {
    url: string;
    label: string;
    className?: string;
  }[];
  showLoginButton: boolean;
  showMainMenuSearch: boolean;
}

export const MainNav: ComponentString<MainNavProps> = ({ mainNavLinks, showLoginButton, showMainMenuSearch}) => nav(
  { className: "mainNavWrapper" }, 
  a(
    { href: "#", className: "mainNavLogo gdquestLogo" }, 
    span(null, "GDQuest")
  ),
  div(
    { id: "main-menu", className: "mainNavItemsList", popover: true },
    button(
      { popovertarget: "main-menu", "ariaHidden": "true", className: "mainNavButtonClose buttonClose" },
      span(null, "close")
    ),
    ... mainNavLinks.map(({ url, label, className }) => a(
      { className: `mainNavItem ${className ? className : ""}`, href: url },
      label
    )),
    // include("/src/components/fontSizeResizer/fontSizeResizer.vto"),
    ThemeToggle({}),
    div(
      { className: "mainNavSecondaryItems" },
      showLoginButton ? a(
        { href: "auth.vto", className: "buttonOutline buttonLogin" },
        span(null, "Login")
      ) : null,
      showMainMenuSearch ? HeaderSiteSearch() : null,
      a(
        { href: "https://discord.gg/87NNb3Z", className: "socialLink" },
        span(null, "Join us on Discord")
      )
    )
  ),
  button(
    { className: "mainNavButtonOpen", popovertarget: "main-menu", "ariaHidden": "true" },
    span(null, "menu")
  )
);