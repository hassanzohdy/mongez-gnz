import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { throwIf } from "./../../../utils";
import { gnWarlockRestful } from "./template";
import { WarlockRestfulOptions } from "./types";

export const generate = async (options: WarlockRestfulOptions) => {
  const now = Date.now();

  const { name, saveTo } = options;

  options.className ||= `Restful${pluralize(toStudlyCase(name))}`;
  options.exportName ||= `restful${pluralize(toStudlyCase(name))}`;
  options.repository ||= `${toCamelCase(name)}Repository`;
  options.repositoryPath ||= `./repositories/${toKebabCase(name)}-repository`;
  options.model ||= `${toStudlyCase(pluralize(name, 1))}`;
  options.modelPath ||= `./../models/${toKebabCase(pluralize(name, 1))}`;

  ensureDirectory(saveTo);

  options.fileName ||= `restful-${toKebabCase(name)}`;

  options.fileName = toKebabCase(options.fileName);

  const Path = path.join(saveTo, `${options.fileName}.ts`);

  throwIf(
    fileExists(Path),
    ` ${chalk.green(options.fileName)}.ts already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  const content = await gnWarlockRestful(options);
  putFile(Path, content);

  console.log(
    ` ${chalk.green(name)} has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), name))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
