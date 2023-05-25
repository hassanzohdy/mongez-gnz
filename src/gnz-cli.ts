import { getJsonFile } from "@mongez/fs";
import { program } from "commander";
import { getGeneratorsList, welcome } from ".";

welcome();

const packageJson = getJsonFile("package.json");

program.version(packageJson.version);

for (const generator of getGeneratorsList()) {
  if (!generator?.cliOptions?.commands) continue;

  for (const command of generator.cliOptions.commands) {
    program.addCommand(command);
  }
}

program.parse(process.argv);
