import { createGenerator, registerGenerator } from "../../generators-list";
import { generateNextjsServerComponentCommand } from "./cli/commands/generate-nextjs-server-component-command";
import { generate } from "./generator";
import { NextServerComponentOptions } from "./types";
export * from "./types";

export const generateNextServerReactComponent =
  createGenerator<NextServerComponentOptions>({
    name: "generate-next-server-component",
    label: "Generate Next Server Component",
    cliOptions: {
      commands: [generateNextjsServerComponentCommand],
    },
    defaultOptions: {
      withIndex: true,
      memo: true,
    },
    generate,
  });

registerGenerator(generateNextServerReactComponent);
