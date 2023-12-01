import { createGenerator, registerGenerator } from "./../../../generators-list";
import { newQwikComponentCommand } from "./cli/commands/newQwikComponentCommand";
import { generate } from "./generator";
import { QwikComponentOptions } from "./types";
export * from "./types";

export const generateQwikComponent = createGenerator<QwikComponentOptions>({
  name: "generate-qwik-component",
  label: "Generate Qwik Component",
  cliOptions: {
    commands: [newQwikComponentCommand],
  },
  defaultOptions: {
    withIndex: false,
  },
  generate,
});

registerGenerator(generateQwikComponent);
