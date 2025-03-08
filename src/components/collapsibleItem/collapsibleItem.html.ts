import {
  tmpl,
  type ComponentString
} from "../../depsServer.ts";
const { dt, dd, div } = tmpl;

interface CollapsibleItemProps {
  open: boolean;
  title: string;
}

/**
 * Represents one item from a list, such as a FAQ or a list of features.
 * If you want a single collapsible item, use CollapsibleElement.
 * @param props
 * @param content 

 */
export const CollapsibleItem: ComponentString<CollapsibleItemProps> = (
  { open, className, title },
  ...content
) =>
  [
    dt(
      {
        dataOpen: open,
        className,
      },
      title
    ),
    dd({}, div({}, ...content)),
  ].join("");
