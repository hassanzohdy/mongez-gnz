import path from "path";
import { createGenerator, registerGenerator } from "./../../generators-list";
import { commandsList } from "./cli";
import { generate } from "./generator";
import { GenerateGeneratorOptions } from "./types";
export * from "./types";

export const generateGenerator = createGenerator<GenerateGeneratorOptions>({
  name: "generate-generator",
  label: "Generate A Generator",
  cliOptions: {
    commands: commandsList,
  },
  defaultOptions: {
    saveTo: path.resolve(process.cwd(), "generators"),
  },
  generate,
});

registerGenerator(generateGenerator);
