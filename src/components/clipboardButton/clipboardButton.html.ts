import { tmpl, type ComponentString } from "../../depsServer.ts";
const { button, span } = tmpl;

type ClipboardButtonProps = {
  title?: string;
  clipboardType?: "currentURL";
  whenCopiedMessage?: string;
};

export const ClipboardButton: ComponentString<ClipboardButtonProps> = (
  {
    whenCopiedMessage,
    className,
    clipboardType = "currentURL",
    title = "Copy url to Clipboard",
  },
  ...children
) =>
  button(
    {
      className,
      dataIs: "clipboard-button",
      dataClipboard: clipboardType,
      title,
      ariaPressed: "false",
      ariaLive: "polite",
    },
    ...children,
    span(
      { dataIs: "clipboard-message", ariaHidden: "true" },
      typeof whenCopiedMessage == "undefined"
        ? "Copied to clipboard!"
        : whenCopiedMessage
    )
  );
