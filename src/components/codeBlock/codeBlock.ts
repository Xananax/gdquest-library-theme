import { splitHTMLElementTextContent } from "../fileInText/fileInText"

document.querySelectorAll<HTMLSpanElement>('.codeBlockFileName').forEach(splitHTMLElementTextContent)