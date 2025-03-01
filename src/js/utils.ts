import { isObject } from "./framework/isObject.ts";
import { kebabize } from "./framework/kebabize.ts";

/**
 * Helper type for DOM event handlers
 */
type DOMEventHandler<K extends keyof ElementEventMap> = (
  event: ElementEventMap[K],
) => void;


type HTMLProps<T extends HTMLElement> =
  & Partial<
    {
      [K in keyof T]: T[K];
    }
  >
  & {
    [K in `on${Capitalize<keyof ElementEventMap>}`]?: DOMEventHandler<
      Uncapitalize<K extends `on${infer E}` ? E : never>
    >;
  }
  & {
    class?: string | string[];
    className?: string | string[];
    classList?: string | string[];
    [key: `data${string}`]: string | number | boolean | null | undefined;
    [key: `aria${string}`]: string | number | boolean | null | undefined;
  };

// Valid child types
type DOMChild = string | number | Node | undefined | null | boolean;

export const Dom =
  <NS extends string | "" | null>(ns: NS) =>
  <K extends keyof HTMLElementTagNameMap>(name: K) =>
  (
    ...args: [HTMLProps<HTMLElementTagNameMap[K]>, ...DOMChild[]] | DOMChild[]
  ): HTMLElementTagNameMap[K] => {
    const [props, ...children] =
      (isObject(args[0])? args : [{}, ...args]) as [
        HTMLProps<HTMLElementTagNameMap[K]>,
        ...DOMChild[],
      ];

    const dom = (
      ns ? document.createElementNS(ns, name) : document.createElement(name)
    ) as HTMLElementTagNameMap[K];

    for (const [k, v] of Object.entries(props)) {
      if (k.startsWith("on") && typeof v === "function") {
        const event = k.slice(2).toLowerCase() as keyof ElementEventMap;
        dom.addEventListener(event, v as EventListener);
      } else if (k.startsWith("aria") || k.startsWith("data")) {
        const key = kebabize(k);
        const value = v == null ? "" : String(v);
        dom.setAttribute(key, value);
      } else if (k === "class" || k === "classList" || k === "className") {
        if (typeof v === "string") {
          dom.classList.add(v);
        } else if (Array.isArray(v)) {
          dom.classList.add(...v);
        }
      } else {
        const value = v == null ? "" : String(v);
        dom.setAttribute(k, value);
      }
    }

    for (const child of (children.flat(Infinity) as DOMChild[])) {
      if (child != null && typeof child !== "boolean") {
        if (typeof child === "number") {
          dom.append(child + "");
        } else {
          dom.append(child);
        }
      }
    }

    return dom;
  };

export const El = Dom("");

export const ul = El("ul");
export const li = El("li");
export const button = El("button");
export const span = El("span");
export const div = El("div");
export const img = El("img");

export const isHTMLElement = (el: any): el is HTMLElement =>
  typeof el === "object" && !("nodeName" in el) &&
  typeof el.nodeName === "undefined";
