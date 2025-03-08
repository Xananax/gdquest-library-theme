import { tmpl, ComponentString } from "../../depsServer.ts";
const { span } = tmpl;

export const CodeErrorInText: ComponentString<void> = (_skip, ...content) =>
  span({ className: "codeErrorInText" }, ...content);
