import { tmpl, ValidChild } from "../../depsServer.ts";
const { div, button, span } = tmpl;

interface CollapsibleElementProps {
  title?: ValidChild;
  isOpen: boolean;
  id?: string;
  className?: string;
}

const randomId = () => "c" + Math.random().toString(36).substring(2, 15);

export const CollapsibleElement = (
  {
    title = "details",
    isOpen = false,
    id = randomId(),
    className,
  }: CollapsibleElementProps,
  ...content: ValidChild[]
) =>
  div(
    {
      dataIsDisclosure: true,
      dataOpen: isOpen,
      className,
    },
    div(
      { className: "disclosureSummary" },
      title
    ),
    div(
      { className: "disclosureDetails", id },
      div({ className: "disclosureDetailsContent" }, ...content)
    )
  );
