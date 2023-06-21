import { createGenerator, registerGenerator } from "./../../../generators-list";
import { newWarlockRestfulCommand } from "./cli/commands/new-warlock-restful-command";
import { generate } from "./generator";
import { WarlockRestfulOptions } from "./types";
export * from "./types";

export const generateWarlockRestful = createGenerator<WarlockRestfulOptions>({
  name: "generate-warlock-restful-handler",
  label: "Generate Warlock Restful Handler",
  cliOptions: {
    commands: [newWarlockRestfulCommand],
  },
  defaultOptions: {},
  generate,
});

registerGenerator(generateWarlockRestful);
