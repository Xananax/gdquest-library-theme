import { tmpl, ValidChild } from "../../depsServer.ts";
import { TableOfContents } from "../tableOfContents/tableOfContents.html.ts";
import { ShareWidget } from "../shareWidget/shareWidget.html.ts";
import { ItemPageMeta } from "../itemPageMeta/itemPageMeta.html.ts";
import { ContributeBlock } from "../contributeBlock/contributeBlock.html.ts";
import { Base, BaseProps } from "../../_base.html.ts";

const { section, main } = tmpl;

interface PageItemProps extends BaseProps {
  staticRoot: string;
  discord_invite: string;
}

export const PageItem = (
  { staticRoot, discord_invite, ...props }: PageItemProps,
  ...children: ValidChild[]
) =>
  Base(
    props,
    section(
      { className: "contentPageGrid" },
      TableOfContents(),
      main({ className: "prose" }, ...children),
      ShareWidget({ claps: 0 }),
      ItemPageMeta({
        staticRoot,
        showTeachingMethodLink: false,
        discord_invite,
      })
    ),
    ContributeBlock()
  );
