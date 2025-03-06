import { tmpl, ValidChild } from "../../depsServer.ts";
import { CollapsibleElement } from "../collapsibleElement/collapsibleElement.html.ts";
const { div, span, strong } = tmpl;

interface HintProps {
  title: string;
}

export const Hint = ({ title }: HintProps, ...content: ValidChild[]) =>
  CollapsibleElement(
    {
      isOpen: !closed,
      className: "hint",
      title: span(
        { className: "hintLabel" },
        ...(title ? [title] : ["click to reveal ", strong(null, "hint")])
      ),
    },
    div(
      {
        className: "hintContent",
      },
      ...content
    )
  );
