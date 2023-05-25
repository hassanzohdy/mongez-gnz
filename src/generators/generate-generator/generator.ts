import { ensureDirectory } from "@mongez/fs";
import { ltrim, toCamelCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { cwd } from "process";
import { showSpinner } from "../../utils";
import {
  generateGeneratorFile,
  generateGeneratorTemplateFile,
  generateIndexFile,
  generateTypesFile,
} from "./template";
import { GenerateGeneratorOptions } from "./types";

export async function generate(optionsList: GenerateGeneratorOptions) {
  // each generator has the following files:
  // types.ts
  // generator.ts
  // index.ts
  // template.ts

  optionsList.saveTo = optionsList.saveTo + "/" + optionsList.name;
  ensureDirectory(optionsList.saveTo);

  optionsList.name = ltrim(ltrim(optionsList.name, "generate-"), "generate");

  optionsList.camelCaseName ??= toCamelCase(optionsList.name) + "Generator";

  optionsList.name = "generate-" + optionsList.name;

  const spinner = showSpinner("Loading...");

  console.log(`Generating ${chalk.yellow(`${optionsList.name}`)} generator...`);

  spinner.update(`Generating ${chalk.yellow("types.ts")} file...`);

  await generateTypesFile(optionsList);

  spinner.update(`Generating ${chalk.yellow("generator.ts")} file...`);

  await generateGeneratorTemplateFile(optionsList);

  spinner.update(`Generating ${chalk.yellow("index.ts")} file...`);

  await generateGeneratorFile(optionsList);

  spinner.update(`Generating ${chalk.yellow("generate-content.ts")} file...`);
  await generateIndexFile(optionsList);

  spinner.stop();

  console.log(
    "Generator ",
    chalk.green(optionsList.name),
    "has been generated in",
    chalk.magenta(
      path
        .relative(path.resolve(cwd()), optionsList.saveTo)
        .replaceAll("\\", "/"),
    ),
  );
}
