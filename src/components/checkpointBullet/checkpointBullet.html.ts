import { tmpl, ValidChild } from '../../depsServer.ts'
const { div } = tmpl

export const CheckPointBullet = ({}, ...content: ValidChild[]) => div({
  className: 'checkpointBullet'}, ...content)