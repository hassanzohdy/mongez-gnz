import { createGenerator, registerGenerator } from "./../../generators-list";
import { newReactMongezCommand } from "./cli/commands/new-react-mongez-module-command";
import { generate } from "./generator";
import { ReactMongezOptions } from "./types";

export const generateReactMongez = createGenerator<ReactMongezOptions>({
  name: "generate-react-mongez-module",
  label: "Generate React Mongez Module",
  cliOptions: {
    commands: [newReactMongezCommand],
  },
  defaultOptions: {
    updateUrls: true,
    addToAppModules: true,
    usingPages: true,
  },
  generate,
});

registerGenerator(generateReactMongez);
