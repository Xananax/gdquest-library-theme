import { tmpl, type ComponentString } from "../../depsServer.ts";
const { button, span } = tmpl;

const classPrefix = "clapsButton";

type ClapsButtonProps = {
  claps: number;
};

export const ClapsButton: ComponentString<ClapsButtonProps> = ({ claps }) =>
  button(
    { className: classPrefix, title: "Clap", "aria-pressed": "false", "aria-live": "polite" },
    span({ className: `${classPrefix}Label` },
      span({ className: `${classPrefix}LabelTitle` }, "Clap")
    ),
    span({ className: `${classPrefix}Bubble` }, "+1"),
    span({ className: `${classPrefix}Amount` },
      span({ className: `${classPrefix}AmountAbbreviated`, "aria-hidden": "true" }, claps || 0),
      span({ className: `${classPrefix}AmountTotal`, "aria-live": "polite" }, claps || 0)
    ),
  );