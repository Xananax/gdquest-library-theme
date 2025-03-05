import { tmpl, ValidChild } from "../../depsServer.ts";
const { span, div } = tmpl;

export const Note = ({
  title = "NOTE:",
}: {
  title?: string;
}, ... children: ValidChild[]) => {
  return div(
    { className: "note" },
    span({ className: "noteIcon", ariaHidden: "true" }),
    span({ className: "noteTitle" }, title),
    div({ className: "noteDescription" }, ...children)
  )
};
