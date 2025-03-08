import { tmpl, ValidChild } from "../../depsServer.ts";
const { span, div } = tmpl;

const classPrefix = "note";

export const Note = (
  {
    title = "NOTE:",
  }: {
    title?: string;
  },
  ...children: ValidChild[]
) => {
  return div(
    { className: classPrefix },
    span({ className: `${classPrefix}Icon`, ariaHidden: "true" }),
    span({ className: `${classPrefix}Title` }, title),
    div({ className: `${classPrefix}Description` }, ...children)
  );
};
