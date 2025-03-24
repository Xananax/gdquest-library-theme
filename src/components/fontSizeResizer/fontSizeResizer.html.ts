import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
const { div, span, button, section } = tmpl;


export const FontSizeResizer: ComponentString = () => section(
    { className: ["fontSizeResizer", "showWhenJSLoads"], hidden: true },
    button({ className: "fontSizeResizerIncrease", title: "Increase font size" },
        span(null, "increase font size")
    ),
    button({ className: "fontSizeResizerReset", title: "Reset font size" },
        span(null, "reset font size")
    ),
    button({ className: "fontSizeResizerDecrease", title: "Decrease font size" },
        span(null, "decrease font size")
    )
);