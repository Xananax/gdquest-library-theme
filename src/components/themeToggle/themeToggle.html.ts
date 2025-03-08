import { tmpl, ComponentString } from "../../depsServer.ts";
const { button, span } = tmpl;

const classPrefix = "themeToggle";

export const ThemeToggle: ComponentString<void, "none"> = () =>
  button(
    {
      title: "Press to toggle to dark mode",
      className: `${classPrefix}Button`,
      dataIsThemeToggle: "true",
    },
    span({ className: `${classPrefix}Label` }, "Toggle Theme"),
    span(
      { className: `${classPrefix}Icons` },
      span(
        {
          className: [`${classPrefix}IconsIcon`, `${classPrefix}IconsIconDark`],
        },
        span({}, "🌙")
      ),
      span(
        {
          className: [
            `${classPrefix}IconsIcon`,
            `${classPrefix}IconsIconLight`,
          ],
        },
        span({}, "☀️")
      )
    )
  );
