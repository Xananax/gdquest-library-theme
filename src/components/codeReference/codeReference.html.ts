import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "./../fileInText/fileInText.html.ts";
import { CollapsibleElement } from "../collapsibleElement/collapsibleElement.html.ts";
const { p, div, h3 } = tmpl;

interface CodeReferenceProps {
  title: string;
  file: string;
  closed: boolean;
  open: boolean;
}

export const CodeReference: ComponentString<CodeReferenceProps> = (
  { title = "Code Reference", file = "", closed = true },
  ...content
) =>
  CollapsibleElement(
    {
      isOpen: !closed,
      className: "codeReference",
      title: h3(
        { className: ["codeReferenceTitle"] },
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
        " script:"
      ),
      ...content
    )
  );
