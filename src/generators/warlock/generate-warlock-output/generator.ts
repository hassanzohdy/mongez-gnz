import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { rtrim, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { throwIf } from "./../../../utils";
import { gnWarlockOutput } from "./template";
import { WarlockOutputOptions } from "./types";

export const generate = async (options: WarlockOutputOptions) => {
  const { name, saveTo } = options;

  options.name = pluralize(rtrim(name, "output"), 1);

  ensureDirectory(saveTo);

  options.fileName ||= `${toKebabCase(name)}-output`;

  options.fileName = toKebabCase(options.fileName);

  options.name = rtrim(toStudlyCase(options.name), "Output") + "Output";

  const now = Date.now();

  const Path = path.join(saveTo, `${options.fileName}.ts`);

  throwIf(
    fileExists(Path),
    ` ${chalk.green(options.fileName)}.ts already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  const content = await gnWarlockOutput(options);
  putFile(Path, content);

  console.log(
    ` ${chalk.green(name)} has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), name))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );

  return {
    ...options,
    path: Path,
  };
};
