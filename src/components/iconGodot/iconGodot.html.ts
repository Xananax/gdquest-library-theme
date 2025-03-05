import { tmpl, ValidChild } from "../../depsServer.ts";
const { span } = tmpl;

export const IconGodot = (
  {
    currentColor = false,
    name,
    asMask = false,
  }: Partial<{
    currentColor: boolean;
    name: string;
    asMask: boolean;
    iconOnly: boolean;
  }>,
  ...children: ValidChild[]
) =>
  span(
    { className: "iconGodotWrapper" },
    span(
      {
        className: [
          `iconGodot`,
          `iconGodot-${name}`,
          currentColor && " iconGodotUseCurrentColor",
          asMask && " iconGodotAsMask",
        ],
        ariaHidden: "true",
      },
      span({ className: "iconGodotLabel" }, name)
    ),
    ...children
  );
