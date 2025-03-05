import { tmpl, ValidChild } from "../../depsServer.ts";
const { span } = tmpl;

export const FileInText = (
  { fileOnly = false }: Partial<{ fileOnly: boolean }>,
  ...content: ValidChild[]
) => span({ dataIs: "file-in-text", dataFileOnly: fileOnly }, ...content);
