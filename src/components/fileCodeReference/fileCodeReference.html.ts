import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
const { div, span } = tmpl;

interface CodeReferenceProps {
  file: string;
  closed?: boolean;
  fileOnly?: boolean;
}

const classPrefix = "fileCodeReference";

export const FileCodeReference: ComponentString<CodeReferenceProps> = (
  { file = "", closed = true, fileOnly = false },
  ...content
) => {
  return CalloutsListSingleItem(
    {
      title: span(
        { className: `${classPrefix}Title` },
        span({ className: `${classPrefix}TitlePrefix` }, "Code Reference: "),
        FileInText({ fileOnly }, file)
      ),
      open: !closed,
      className: [`${classPrefix}`],
      type: "code",
    },
    div(
      {
        className: `${classPrefix}Content`,
      },
      ...content
    )
  );
};
