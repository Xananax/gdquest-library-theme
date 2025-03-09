import { splitPathStringToParts, add, span, wbr } from "../../js/deps.ts";

const classPrefix = "fileInText";

export const splitHTMLElementTextContent = (holderElement: HTMLElement) => {
    const pathStr = holderElement.textContent;
    if (pathStr == null || pathStr === "") {
        holderElement.remove();
        return;
    }
    const fileOnly = holderElement.hasAttribute("data-file-only");

    const pathParts = splitPathStringToParts(pathStr);
    let recipient = holderElement;
    if (fileOnly) {
        const label = span(
            { class: `${classPrefix}Label` },
            pathParts.filename,
        );
        holderElement.textContent = "";
        recipient = span({ class: `${classPrefix}Tooltip` });
        add(holderElement, label, recipient);
    }
    recipient.textContent = "";
    holderElement.classList.add(`${classPrefix}-${pathParts.fileType}`);
    
    add(
        recipient,
        span({ class: `${classPrefix}Protocol` }, pathParts.protocol),
        span({ class: `${classPrefix}Slash` }, "://"),
        pathParts.dirname.length > 0
            ? pathParts.dirname.map((chunk) => [
                span({ class: `${classPrefix}Directory` }, chunk),
                span({ class: `${classPrefix}Slash` }, "/"),
                wbr()
            ])
            : undefined,
        pathParts.filename &&
            span({ class: `${classPrefix}File` }, pathParts.filename),
    );
};

document.querySelectorAll<HTMLSpanElement>('[data-is="file-in-text"]').forEach(
    splitHTMLElementTextContent,
);
