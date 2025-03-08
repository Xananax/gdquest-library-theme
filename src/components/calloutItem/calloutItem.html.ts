import { type ComponentString } from "../../depsServer.ts";
import { CollapsibleItem } from "../collapsibleItem/collapsibleItem.html.ts";

interface CalloutItemProps {
  type: "question" | "info" | "warning" | "error" | "troubleshoot";
  title: string;
  open: boolean;
}

export const CalloutItem: ComponentString<CalloutItemProps> = (
  { type = "question", title = "details", open = false, className },
  ...content
) => CollapsibleItem({ className: [type, className], title, open }, ...content);
