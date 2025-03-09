import { tmpl, ValidChild } from "../../depsServer.ts";
const { span, wbr } = tmpl;

type SettingsInTextProps = {
  sections?: string;
  children?: ValidChild[];
} & (
  | { sections: string }
  | {
      children: ValidChild[];
    }
);

export const SettingsInText = ({ sections, children }: SettingsInTextProps) => {
  const parts = (sections ?? "").split("->");
  return span(
    { className: "settingsInText" },
    ...parts.map((section, index) =>
      [
        span(
          {
            className: [
              "settingsInTextSection",
              index === 0 && "settingsInTextSectionFirst",
              index === parts.length - 1 && "settingsInTextSectionLast",
            ],
          },
          section.trim()
        ),
        wbr(),
      ].join("")
    ),
    ...(children ?? [])
  );
};
