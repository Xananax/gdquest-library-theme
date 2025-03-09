import { tmpl, ComponentString } from "../../depsServer.ts";

type SectionTitle = Partial<{
  icon: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | 6;
  className: string[];
}>;

export const SectionTitle: ComponentString<SectionTitle> = (
  { level = 1, icon, className = [] },
  ...content
) =>
  tmpl(
    `h${level}`,
    {
      className: icon && [`hasIconBefore`, `icon-${icon}`, ...(Array.isArray(className)? className : [className])],
    },
    ...content
  );
