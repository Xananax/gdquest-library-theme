import { tmpl, ValidChild } from "../../depsServer.ts";
const { span } = tmpl;

export const CodeErrorInText = (
  { }: { },
  ...content: ValidChild[]
) => span({ className: 'codeErrorInText' }, ...content);
