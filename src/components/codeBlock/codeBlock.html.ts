import { tmpl, ValidChild } from "../../depsServer.ts";
const { pre, span, code } = tmpl;

export const CodeBlock = (
  {
    line,
    diff = false,
    file = "",
    lang = "gdscript",
  }: Partial<{ line: number; diff: boolean; file: string; lang: string }>,
  ...content: ValidChild[]
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
