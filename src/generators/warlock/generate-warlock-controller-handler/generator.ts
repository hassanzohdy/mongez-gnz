import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { toCamelCase, toKebabCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { throwIf } from "../../../utils";
import { gnWarlockHandler } from "./template";
import { WarlockHandlerOptions } from "./types";

export const generate = async (options: WarlockHandlerOptions) => {
  const now = Date.now();

  options.fileName ||= `${toKebabCase(options.name)}`;

  options.fileName = toKebabCase(options.fileName);

  options.name = toCamelCase(options.name);

  const { name, saveTo } = options;

  ensureDirectory(saveTo);

  const Path = path.join(saveTo, `${options.fileName}.ts`);

  throwIf(
    fileExists(Path),
    ` ${chalk.green(options.fileName)}.ts already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  const content = await gnWarlockHandler(options);
  putFile(Path, content);

  console.log(
    ` ${chalk.green(
      name,
    )} handler has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), name))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
