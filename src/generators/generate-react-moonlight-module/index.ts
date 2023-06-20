import { createGenerator, registerGenerator } from "./../../generators-list";
import { newMoonlightModuleCommand } from "./cli/commands/new-react-moonlight-module-command";
import { generate } from "./generator";
import { ReactMoonlightOptions } from "./types";

export const generateMoonlightModule = createGenerator<ReactMoonlightOptions>({
  name: "generate-react-moonlight-module",
  label: "Generate React Moonlight Module",
  cliOptions: {
    commands: [newMoonlightModuleCommand],
  },
  defaultOptions: {
    updateUrls: true,
    addToAppModules: true,
    usingPages: true,
  },
  generate,
});

registerGenerator(generateMoonlightModule);
