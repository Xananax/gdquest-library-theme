import { tmpl, ComponentString } from '../../depsServer.ts'
const { figure, blockquote, figcaption, h4, h5 } = tmpl

export const QuoteBubble: ComponentString<{}> = (_skip, ...content) => figure({
  className: 'quoteBubble'},
  blockquote({className: 'quoteBubbleContents'}, ...content),
  figcaption({className: 'quoteBubbleAuthor'},
    h4({className: 'quoteBubbleAuthorName'}, 'Nathan'),
    h5({className: 'quoteBubbleAuthorTitle'}, 'Founder and teacher at GDQuest')
  )
)