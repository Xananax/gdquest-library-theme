import { tmpl, simpleHash, ComponentString, ValidChild } from "../../depsServer.ts";
const { div } = tmpl;

interface CollapsibleElementProps {
  title?: ValidChild;
  isOpen: boolean;
  id?: string;
  className?: string;
}

let ids = 0
const predictableId = (baseString: string) => 'c' + simpleHash(baseString) + (ids++)

export const CollapsibleElement: ComponentString<CollapsibleElementProps> = (
  { title = "details", isOpen = false, id = "", className },
  ...content
) =>
  div(
    {
      dataIsDisclosure: true,
      dataOpen: isOpen,
      className,
    },
    div({ className: "disclosureSummary" }, title),
    div(
      { className: "disclosureDetails", id: id || predictableId(title+content.join('')) },
      div({ className: "disclosureDetailsContent" }, ...content)
    )
  );
