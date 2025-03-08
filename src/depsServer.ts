import { HTMLFactory } from "./../../process-course-utils/src/any/createElement/types.ts";

export { tmpl } from "../../process-course-utils/src/any/createElement/tmpl.any.ts";
export { type ImageResourceInfo } from "./../../process-course-utils/src/cli/getImageInfoFromMarkdown.ts";
export type ValidChild = HTMLFactory.ValidChild;
export type ClassNameValue = HTMLFactory.ClassNameValue;

interface AnyComponentProps extends HTMLFactory.Attributes<"div"> {}

type ChildMode = "many" | "two" |  "one" | "none";

export type ComponentString<
  T = {},
  Mode extends ChildMode = "many"
> = Mode extends "many"
  ? (props: AnyComponentProps & T, ...content: ValidChild[]) => string
  : Mode extends "two"
  ? (props: AnyComponentProps & T, content1: ValidChild, content2: ValidChild) => string
  : Mode extends "one"
  ? (props: AnyComponentProps & T, content: ValidChild) => string
  : Mode extends "none"
  ? (props: AnyComponentProps & T) => string
  : never;
