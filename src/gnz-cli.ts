import { getJsonFile } from "@mongez/fs";
import { program } from "commander";
import { generateUsingNodeApi } from "./generate-using-api";
import { getGeneratorsList } from "./generators-list";
import { welcome } from "./utils";

export async function gnzCli() {
  welcome();

  const packageJson = getJsonFile("package.json");

  program.version(packageJson.version);
  program.addCommand(generateUsingNodeApi);

  for (const generator of getGeneratorsList()) {
    if (!generator?.cliOptions?.commands) continue;

    for (const command of generator.cliOptions.commands) {
      program.addCommand(command);
    }
  }

  program.parse(process.argv);
}
