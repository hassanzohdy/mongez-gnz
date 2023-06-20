import { createGenerator, registerGenerator } from "./../../../generators-list";
import { newWarlockOutputCommand } from "./cli/commands/new-warlock-output-command";
import { generate } from "./generator";
import { WarlockOutputOptions } from "./types";

export const generateWarlockOutput = createGenerator<WarlockOutputOptions>({
  name: "generate-warlock-output",
  label: "Generate Warlock Output",
  cliOptions: {
    commands: [newWarlockOutputCommand],
  },
  defaultOptions: {
    withExtend: true,
    withBaseOutputDetails: true,
    outputKeys: {},
    baseOutputDetailsPath: "app/utils/output",
    withBaseOutputDetailsFunctionName: "withBaseOutputDetails",
  },
  generate,
});

registerGenerator(generateWarlockOutput);
