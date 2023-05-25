import { Command } from "commander";
import { generate } from "../generator";

export const generateGeneratorCommand = new Command("gn <name>")
  .requiredOption(
    "-s, --save-to <path>",
    "Save the generator to the given path",
  )
  .option("-cc, --camel-case-name", "the generator name in camel case")
  .action(async (name, options) => {
    await generate({
      name,
      saveTo: options.saveTo,
      camelCaseName: options.camelCaseName,
    });
  });

export const commandsList = [generateGeneratorCommand];
