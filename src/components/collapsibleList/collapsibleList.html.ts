import { tmpl, ComponentString } from "../../depsServer.ts";
const { dl } = tmpl;

export const CollapsibleList: ComponentString<{className?: string}> = (
  { className } = {},
  ...content
) => dl({ className: [className], dataIs: "collapsible-list" }, ...content);
