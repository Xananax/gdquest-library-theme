import { splitHTMLElementTextContent } from "../fileInText/fileInText.ts"

document.querySelectorAll<HTMLSpanElement>('.codeBlockFileName').forEach(splitHTMLElementTextContent)