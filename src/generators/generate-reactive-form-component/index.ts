import { createGenerator, registerGenerator } from "./../../generators-list";
import { newReactComponentCommand } from "./cli/commands/new-reactive-form-command";
import { generate } from "./generator";
import { ReactiveFormComponentOptions } from "./types";
export * from "./types";

export const generateReactiveFormComponent =
  createGenerator<ReactiveFormComponentOptions>({
    name: "generate-reactive-form-component",
    label: "Generate Reactive Form Component",
    cliOptions: {
      commands: [newReactComponentCommand],
    },
    defaultOptions: {
      memo: true,
      withIndex: true,
    },
    generate,
  });

registerGenerator(generateReactiveFormComponent);
