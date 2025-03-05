/**
<h1 class="hasIconBefore{{ if icon }} icon-{{ icon }}{{ /if }}">{{- content -}}</h1>
 */

import { tmpl, ValidChild } from '../../depsServer.ts'
const { h1 } = tmpl


export const SectionTitle = ({ icon }: Partial<{ icon: string }>, ...content: ValidChild[]) => h1({
  className: icon && [ `hasIconBefore`, `icon-${icon}`],
}, ...content)