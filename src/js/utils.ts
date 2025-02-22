//@ts-check

export const kebabize = (/** @type string **/str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
  );

export const protoOf = Object.getPrototypeOf;
export const objProto = protoOf({});

export const Dom =
  (ns) =>
  (name) =>
  (...args) => {
    const [props, ...children] =
      protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args];
    const dom = ns
      ? document.createElementNS(ns, name)
      : document.createElement(name);
    for (const [k, v] of Object.entries(props)) {
      if (k.startsWith("on")) {
        const event = k.slice(2);
        dom.addEventListener(event.toLowerCase(), v);
      } else if (k.startsWith("aria") || k.startsWith("data")) {
        const key = kebabize(k);
        dom.setAttribute(key, v);
      } else if (k === "class" || k === "classList" || k === "className") {
        if (typeof v === "string") {
          dom.classList.add(v);
        } else if (Array.isArray(v)) {
          dom.classList.add(...v);
        }
      } else {
        dom.setAttribute(k, v);
      }
    }
    for (const child of children.flat(Infinity)) {
      typeof child !== "undefined" &&
        typeof child !== "boolean" &&
        dom.append(child);
    }
    return dom;
  };

export const El = Dom("");

export const [ul, li, button, span, div, img] = [
  "ul",
  "li",
  "button",
  "span",
  "div",
  "img",
].map(El);

export const debounce = (fn, delay = 250) => {
  let resizeTimeout = null;
  return () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      fn();
    }, delay);
  };
};

/**
 * 
 * @param {any} el 
 * @returns {el is HTMLElement}
 */
export const isHTMLElement = (el) => typeof el === 'object' && !('nodeName' in el) && typeof el.nodeName === 'undefined'