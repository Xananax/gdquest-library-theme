import { tmpl, ComponentString } from "../../depsServer.ts";
const { span } = tmpl;

export const CheckPointBullet: ComponentString = (_skip, ...content) =>
  span(
    {
      className: "checkpointBullet",
    },
    ...content
  );
