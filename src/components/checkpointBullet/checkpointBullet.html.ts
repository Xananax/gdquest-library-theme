import { tmpl, ComponentString } from "../../depsServer.ts";
const { div } = tmpl;

export const CheckPointBullet: ComponentString = (_skip, ...content) =>
  div(
    {
      className: "checkpointBullet",
    },
    ...content
  );
