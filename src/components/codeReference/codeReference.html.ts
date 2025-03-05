import { tmpl, ValidChild } from "../../depsServer.ts";
import { SectionTitle as SectionTitle } from "./../sectionTitle/sectionTitle.html.ts";
import { FileInText as FileInText } from "./../fileInText/fileInText.html.ts";
const { details, summary, div, p } = tmpl;

export const CodeReference = (
  { title = "Code Reference", file = "" }: Partial<{ title: string; file: string }>,
  ...content: ValidChild[]
) =>
  details(
    { open: true, className: "codeReference" },
    summary(null, SectionTitle({ icon: "code" }, title)),
    div(
      { className: "codeReferenceContent" },
      p(
        null,
        "Here's the complete code for the ",
        FileInText({}, file),
        " script at the end of this lesson:"
      ),
      ...content
    )
  );
