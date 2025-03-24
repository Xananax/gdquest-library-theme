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

interface ItemDiscordInviteProps {
  discord_invite: string
}

export const ItemDiscordInvite: ComponentString<ItemDiscordInviteProps> = ({ discord_invite}) => section(
  { className: "itemDiscordInvite" },
  h4(null, "This tutorial has a Discord channel!"),
  p(null, "Connect with fellow beginners and pros building games and learning."),
  span(null, "20,000 members"),
  a({ href: discord_invite }, "Join Server")
)