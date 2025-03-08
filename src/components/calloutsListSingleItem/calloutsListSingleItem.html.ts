import { type ComponentString } from "../../depsServer.ts";
import { CalloutItem, type CalloutItemProps } from "../calloutItem/calloutItem.html.ts";
import { CalloutsList } from "../calloutsList/calloutsList.html.ts";

export const CalloutsListSingleItem: ComponentString<CalloutItemProps> = (
  props,
  ...content
) => CalloutsList({}, CalloutItem(props, ...content));
