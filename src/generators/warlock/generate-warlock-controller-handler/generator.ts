import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "../../../factories/names-factory";
import { throwIf } from "../../../utils";
import { gnWarlockHandler } from "./template";
import { WarlockHandlerOptions } from "./types";

export const generate = async (options: WarlockHandlerOptions) => {
  const now = Date.now();

  options.fileName ||= namesFactory.controllerFilePath(options.name);

  options.name = namesFactory.controllerName(options.name);

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
      saveTo + "/" + options.fileName,
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
