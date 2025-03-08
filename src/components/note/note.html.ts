import { tmpl, ComponentString } from "../../depsServer.ts";
const { span, div } = tmpl;

const classPrefix = "note";

interface NoteProps{
  title?: string;
}

export const Note: ComponentString<NoteProps> = ({ title = "NOTE:" }, ...children) => {
  return div(
    { className: classPrefix },
    span({ className: `${classPrefix}Icon`, ariaHidden: "true" }),
    span({ className: `${classPrefix}Title` }, title),
    div({ className: `${classPrefix}Description` }, ...children)
  );
};
