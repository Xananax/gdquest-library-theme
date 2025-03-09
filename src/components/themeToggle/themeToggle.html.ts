import { tmpl, ComponentString } from "../../depsServer.ts";
const { button, span } = tmpl;

const classPrefix = "themeToggle";

export const ThemeToggle: ComponentString<void, "none"> = () =>
  button(
    {
      title: "Press to toggle to dark mode",
      className: `${classPrefix}Button`,
      dataIs: "theme-toggle",
    },
    span({ className: `${classPrefix}Label` }, "Toggle Theme"),
    span(
      { className: `${classPrefix}Icons` },
      span(
        {
          className: [`${classPrefix}IconsIcon`, `${classPrefix}IconsIconDark`],
        },
        span(null, "🌙")
      ),
      span(
        {
          className: [
            `${classPrefix}IconsIcon`,
            `${classPrefix}IconsIconLight`,
          ],
        },
        span(null, "☀️")
      )
    )
  );
