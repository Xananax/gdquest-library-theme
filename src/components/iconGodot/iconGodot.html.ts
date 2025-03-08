import { ComponentString, tmpl } from "../../depsServer.ts";
const { span } = tmpl;

type IconGodotProps = Partial<{
  currentColor: boolean;
  name: string;
  asMask: boolean;
  iconOnly: boolean;
}>;

export const IconGodot: ComponentString<IconGodotProps> = (
  { currentColor = false, name, asMask = false },
  ...children
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
