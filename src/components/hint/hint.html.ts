import { tmpl, ValidChild } from "../../depsServer.ts";
import { SectionTitle as SectionTitle } from "./../sectionTitle/sectionTitle.html.ts";
import { FileInText as FileInText } from "./../fileInText/fileInText.html.ts";
import { CollapsibleElement } from "../collapsibleElement/collapsibleElement.html.ts";
const { p, div, span, strong } = tmpl;

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
