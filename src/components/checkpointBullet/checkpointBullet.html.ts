import { tmpl, ComponentString } from "../../depsServer.ts";
const { div } = tmpl;

export const CheckPointBullet: ComponentString<void> = (_skip, ...content) =>
  div(
    {
      className: "checkpointBullet",
    },
    ...content
  );
