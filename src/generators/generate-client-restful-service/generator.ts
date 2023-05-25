// This file is responsible for generating the code template.
// It is called when user calls this generator.
// Code template should not be added here, use 'template.ts' instead then get the output
// of the function and put it in the file here, this makes it easier to maintain your generator.
import { ensureDirectory, putFile } from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { getTemplateContents } from "./template";
import {
  ClientRestfulServiceGeneratorOptions,
  ClientRestfulServiceGeneratorOptionsStrict,
} from "./types";
import path from "path";

function prepareName(name: string) {
  // Make sure that the name ends with "-service"
  if (!name.endsWith("-service")) {
    name += "-service";
  }

  return name;
}

export async function generate(
  optionsList: ClientRestfulServiceGeneratorOptions
) {
  // this is just an example, you can remove it.
  const { saveTo, name } = optionsList;

  optionsList.name = prepareName(name);

  optionsList.saveAs ||= optionsList.name + ".ts";

  optionsList.className ||= toStudlyCase(optionsList.name);

  optionsList.objectName ||= toCamelCase(optionsList.name);

  optionsList.route ||=
    "/" + toKebabCase(optionsList.name.replace("-service", ""));

  // make sure the directory exists
  ensureDirectory(saveTo);

  // generate the content
  const contents = await getTemplateContents(
    optionsList as ClientRestfulServiceGeneratorOptionsStrict
  );

  // stop the loader
  console.log(`Generated ${chalk.green(name)} restful service successfully.`);

  // save the content to the file
  putFile(path.resolve(saveTo, optionsList.saveAs), contents);
}
