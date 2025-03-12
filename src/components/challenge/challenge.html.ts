import { tmpl, type ComponentString } from "../../depsServer.ts";
const { div, h3 } = tmpl;

const classPrefix = "challenge";

export const Challenge: ComponentString = (_skip, ...children) =>
  div(
    { className: classPrefix },
    h3({ className: `${classPrefix}Title` }, "Challenge"),
    ...children
  );