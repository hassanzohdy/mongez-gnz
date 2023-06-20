// This file is responsible for generating the code template.
// It is called when user calls this generator.
// Code template should not be added here, use 'template.ts' instead then get the output
// of the function and put it in the file here, this makes it easier to maintain your generator.
import { ensureDirectory, putFile } from "@mongez/fs";
import { toKebabCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { showSpinner } from "./../../utils";
import { getTemplateContents } from "./template";
import { ClientServiceFileGeneratorOptions } from "./types";

export async function generate(optionsList: ClientServiceFileGeneratorOptions) {
  // this is just an example, you can remove it.
  const { saveTo } = optionsList;

  optionsList.name = toKebabCase(optionsList.name);

  optionsList.saveAs ??= optionsList.name + "-service.ts";

  // use loader to show a spinner while generating the content
  const loader = showSpinner(`Generating ${chalk.yellow("index.ts")} file...`);

  // make sure the directory exists
  ensureDirectory(saveTo);

  // generate the content
  const contents = await getTemplateContents(optionsList);

  // stop the loader
  loader.stop(`Generated ${chalk.green("index.ts")} file successfully.`);

  // save the content to the file
  putFile(saveTo + `/${optionsList.saveAs}`, contents);

  return optionsList;
}
