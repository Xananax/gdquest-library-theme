import { tmpl } from "../../depsServer.ts";
import { ClipboardButton } from "./../clipboardButton/clipboardButton.html.ts";
import { SectionTitle } from "../sectionTitle/sectionTitle.html.ts";
const { section, h1, span, div, ul, li, a, p, aside } = tmpl;


export const DownloadButtonsList = () => section(
  { className: "downloadButtonsList", ariaRole: "region", ariaRoledescription: "download links" },
  SectionTitle({ icon: "download" }, "Download Files"),
  ul(
    { role: "list" },
    li(
      null,
      a({ href: "#", className: "windows" }, span(null, "Download for Windows"))
    ),
    li(
      null,
      a({ href: "#", className: "linux" }, span(null, "Download for Linux"))
    ),
    li(
      null,
      a({ href: "#", className: "macos" }, span(null, "Download for Mac")),
      a({ href: "#macDownloadInstructions", className: "asterisk", ariaDescribedby: "macDownloadInstructions" })
    )
  ),
  aside(
    { className: "asterisk-link", id: "macDownloadInstructions" },
    "On MacOS, you currently need to",
    a({ href: "#" }, "download Godot 4.4"),
    "separately. On Windows and Linux, the course projects come preloaded in a copy of Godot."
  )
); 