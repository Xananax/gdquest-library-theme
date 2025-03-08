import { tmpl, ComponentString } from "../../depsServer.ts";
const { span } = tmpl;

type FileInTextProps = Partial<{ fileOnly: boolean }>;

export const FileInText: ComponentString<FileInTextProps> = (
  { fileOnly = false },
  ...content
) => span({ dataIs: "file-in-text", dataFileOnly: fileOnly }, ...content);
