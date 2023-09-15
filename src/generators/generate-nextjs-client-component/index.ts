import { createGenerator, registerGenerator } from "../../generators-list";
import { generateNextjsClientComponentCommand } from "./cli/commands/generate-nextjs-client-component-command";
import { generate } from "./generator";
import { NextClientComponentOptions } from "./types";
export * from "./types";

export const generateNextClientReactComponent =
  createGenerator<NextClientComponentOptions>({
    name: "generate-next-client-component",
    label: "Generate Next Client Component",
    cliOptions: {
      commands: [generateNextjsClientComponentCommand],
    },
    defaultOptions: {
      withIndex: true,
      memo: true,
    },
    generate,
  });

registerGenerator(generateNextClientReactComponent);
