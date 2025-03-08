import { ComponentString, tmpl } from "../../depsServer.ts";
const { pre, span, code } = tmpl;

type CodeBlockProps = Partial<{ line: number; diff: boolean; file: string; lang: string }>

export const CodeBlock: ComponentString<CodeBlockProps> = (
  {
    line,
    diff = false,
    file = "",
    lang = "gdscript",
  },
  ...content
) =>
  pre(
    {
      className: line ? "line-numbers" : "",
      dataStart: line || 1,
    },
    file && span({ className: "codeBlockFileName" }, file),
    code(
      {
        className: [
          diff ? `language-diff-${lang}` : `language-${lang}`,
          diff ? `diff-highlight` : `no-diff-highlight`
        ],
      },
      ...content
    )
  );
