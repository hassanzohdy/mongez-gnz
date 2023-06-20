import { createGenerator, registerGenerator } from "../../../generators-list";
import { newWarlockRepositoryCommand } from "./cli/commands/new-warlock-repository-command";
import { generate } from "./generator";
import { WarlockRepositoryOptions } from "./types";

export const generateWarlockRepository =
  createGenerator<WarlockRepositoryOptions>({
    name: "generate-warlock-repository",
    label: "Generate Warlock Repository",
    cliOptions: {
      commands: [newWarlockRepositoryCommand],
    },
    defaultOptions: {},
    generate,
  });

registerGenerator(generateWarlockRepository);
