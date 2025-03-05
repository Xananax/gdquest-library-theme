import { tmpl, ValidChild } from '../../depsServer.ts'
const { pre, span, code } = tmpl


export const CodeBlock = ({ line, diff, file }: Partial<{line: number, diff: boolean, file: string}>, ...content: ValidChild[]) => pre({
  className: line ? 'line-numbers' : '',
  dataStart: line || 1,
}, 
  file && span({ className: 'codeBlockFileName' }, file),
  code({ className: [diff ? 'language-diff-gdscript' : 'language-gdscript', 'boboooo'] }, ...content)
)