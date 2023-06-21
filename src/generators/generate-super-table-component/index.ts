import { createGenerator, registerGenerator } from "../../generators-list";
import { newSuperTableCommand } from "./cli/commands/new-super-table-command";
import { generate } from "./generator";
import { SuperTableComponentOptions } from "./types";
export * from "./types";

export const generateSuperTableComponent =
  createGenerator<SuperTableComponentOptions>({
    name: "generate-super-table-component",
    label: "Generate Super tTable Component",
    cliOptions: {
      commands: [newSuperTableCommand],
    },
    defaultOptions: {
      memo: true,
      withIndex: true,
      asPage: true,
    },
    generate,
  });

registerGenerator(generateSuperTableComponent);
