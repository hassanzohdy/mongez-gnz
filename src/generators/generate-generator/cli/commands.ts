import { Command } from "commander";
import { generateGenerator } from "..";
import { gnz } from "./../../../main";

export const generateGeneratorCommand = new Command("gn <name>")
  .requiredOption(
    "-s, --save-to <path>",
    "Save the generator to the given path",
  )
  .option("-cc, --camel-case-name", "the generator name in camel case")
  .action(async (name, options) => {
    await gnz.execute(
      generateGenerator.execute({
        name,
        saveTo: options.saveTo,
        camelCaseName: options.camelCaseName,
      }),
    );
  });

export const commandsList = [generateGeneratorCommand];
