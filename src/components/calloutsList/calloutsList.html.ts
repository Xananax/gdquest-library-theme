import { type ComponentString } from "../../depsServer.ts";
import { CollapsibleList } from "../collapsibleList/collapsibleList.html.ts";


export const CalloutsList:ComponentString = (_skip, ...content) => CollapsibleList({
  className: "calloutsList"
}, ...content);