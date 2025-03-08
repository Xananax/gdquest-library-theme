import { tmpl, ComponentString } from "../../depsServer.ts";
const { dl } = tmpl;

export const CollapsibleList: ComponentString<{}> = (
  { className },
  ...content
) => dl({ className: [className], dataIs: "collapsibleList" }, ...content);
