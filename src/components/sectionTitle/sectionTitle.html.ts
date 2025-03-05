/**
<h1 class="hasIconBefore{{ if icon }} icon-{{ icon }}{{ /if }}">{{- content -}}</h1>
 */

import { tmpl, ValidChild } from "../../depsServer.ts";
const { h1 } = tmpl;

export const SectionTitle = (
  {
    level = 1,
    icon,
    className = [],
  }: Partial<{
    icon: string;
    level: 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | 6;
    className: string[]
  }>,
  ...content: ValidChild[]
) =>
  tmpl(
    `h${level}`,
    {
      className: icon && [`hasIconBefore`, `icon-${icon}`, ...className],
    },
    ...content
  );
