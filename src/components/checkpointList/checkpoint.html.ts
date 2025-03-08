import { tmpl, type ComponentString } from "../../depsServer.ts";
import { CheckPointBullet } from "../checkpointBullet/checkpointBullet.html.ts";
const { ul, li, h3, section, p } = tmpl;

const classPrefix = "checkpoint";

export const CheckpointList: ComponentString = (_skip, ...children) =>
  section(
    { className: classPrefix },
    h3({}, "Checkpoint"),
    p(
      {},
      "At the end of this section, you should be able to verify the following:"
    ),
    ul({ role: "list" },
      ...children.map((c) => li({}, CheckPointBullet({}, c)))
    )
  );