import { createGenerator, registerGenerator } from "./../../generators-list";
import { newReactComponentCommand } from "./cli/commands/newReactComponentCommand";
import { generate } from "./generator";
import { ReactComponentOptions } from "./types";

export const generateReactComponent = createGenerator<ReactComponentOptions>({
  name: "generate-react-component",
  label: "Generate React Component",
  cliOptions: {
    commands: [newReactComponentCommand],
  },
  defaultOptions: {
    withIndex: true,
    memo: true,
  },
  generate,
});

registerGenerator(generateReactComponent);
