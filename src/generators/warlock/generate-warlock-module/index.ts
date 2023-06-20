import { createGenerator, registerGenerator } from "../../../generators-list";
import { newWarlockModuleCommand } from "./cli/commands/new-warlock-module-command";
import { generate } from "./generator";
import { WarlockModuleOptions } from "./types";

export const generateWarlockModule = createGenerator<WarlockModuleOptions>({
  name: "generate-warlock-module",
  label: "Generate Warlock Module",
  cliOptions: {
    commands: [newWarlockModuleCommand],
  },
  defaultOptions: {},
  generate,
});

registerGenerator(generateWarlockModule);
