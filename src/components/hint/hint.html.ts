import { ComponentString, tmpl } from "../../depsServer.ts";
import { CollapsibleElement } from "../collapsibleElement/collapsibleElement.html.ts";
const { div, span, strong } = tmpl;

interface HintProps {
  title: string;
}

export const Hint: ComponentString<HintProps> = ({ title }, ...content) =>
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
