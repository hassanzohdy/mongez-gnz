import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { throwIf } from "../../../utils";
import { gnWarlockRepository } from "./template";
import { WarlockRepositoryOptions } from "./types";

export const generate = async (options: WarlockRepositoryOptions) => {
  const now = Date.now();

  const { name, saveTo } = options;

  options.className ||= `${pluralize(toStudlyCase(name))}Repository`;
  options.exportName ||= `${pluralize(toCamelCase(name))}Repository`;
  options.model ||= `${toStudlyCase(pluralize(name, 1))}`;
  options.modelPath ||= `./../models/${toKebabCase(pluralize(name, 1))}`;

  ensureDirectory(saveTo);

  options.fileName ||= `${toKebabCase(name)}`;

  options.fileName = toKebabCase(options.fileName) + ".repository";

  const Path = path.join(saveTo, `${options.fileName}.ts`);

  throwIf(
    fileExists(Path),
    ` ${chalk.green(options.fileName)}.ts already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  const content = await gnWarlockRepository(options);
  putFile(Path, content);

  console.log(
    ` ${chalk.green(
      name,
    )} repository has been generated successfully in ${chalk.cyan(
      saveTo + "/" + options.fileName,
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );

  return options;
};
