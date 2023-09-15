import { createGenerator, registerGenerator } from "../../generators-list";
import { newReactComponentCommand } from "./cli/commands/newReactComponentCommand";
import { generate } from "./generator";
import { NextClientComponentOptions } from "./types";
export * from "./types";

export const generateNextClientReactComponent =
  createGenerator<NextClientComponentOptions>({
    name: "generate-next-client-component",
    label: "Generate Next Client Component",
    cliOptions: {
      commands: [newReactComponentCommand],
    },
    defaultOptions: {
      withIndex: true,
      memo: true,
    },
    generate,
  });

registerGenerator(generateNextClientReactComponent);
