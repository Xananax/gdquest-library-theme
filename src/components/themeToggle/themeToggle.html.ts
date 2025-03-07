import { tmpl } from "../../depsServer.ts";
const { form, button, span } = tmpl;

const classPrefix = "themeToggle";

export const ThemeToggle = () =>
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
