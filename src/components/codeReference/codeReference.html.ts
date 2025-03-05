import { tmpl, ValidChild } from "../../depsServer.ts";
import { SectionTitle as SectionTitle } from "./../sectionTitle/sectionTitle.html.ts";
import { FileInText as FileInText } from "./../fileInText/fileInText.html.ts";
import { CollapsibleElement } from "../collapsibleElement/collapsibleElement.html.ts";
const { p, div } = tmpl;

interface CodeReferenceProps {
  title: string;
  file: string;
  closed: boolean;
  open: boolean;
}

export const CodeReference = (
  { title = "Code Reference", file = "", closed = true }: CodeReferenceProps,
  ...content: ValidChild[]
) =>
  CollapsibleElement(
    {
      isOpen: !closed,
      className: "codeReference",
      title: SectionTitle(
        { icon: "code", level: 4, className: ["codeReferenceTitle"] },
        title
      ),
    },
    div(
      {
        className: "codeReferenceContent",
      },
      p(
        null,
        "Here's the complete code for the ",
        FileInText({}, file),
        " script at the end of this lesson:"
      ),
      ...content
    )
  );
