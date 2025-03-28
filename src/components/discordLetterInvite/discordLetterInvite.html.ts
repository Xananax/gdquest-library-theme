import {
  tmpl,
  ComponentString,
} from "../../depsServer.ts";
const { a, span } = tmpl;

type DiscordLetterInviteProps = {
  discord_invite: `https://discord.gg/${string}`;
};

const classPrefix = "discordLetterInvite";

export const DiscordLetterInvite: ComponentString<DiscordLetterInviteProps> = ({
  discord_invite,
}) =>
  span(
    { className: classPrefix },
    span({ className: `${classPrefix}Message`}, "You're invited to join our ", a({ href: discord_invite }, "Discord Server!"))
  );
