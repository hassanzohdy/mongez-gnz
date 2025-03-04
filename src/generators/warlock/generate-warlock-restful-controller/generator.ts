import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "../../../factories/names-factory";
import { throwIf } from "./../../../utils";
import { gnWarlockRestful } from "./template";
import { WarlockRestfulOptions } from "./types";

export const generate = async (options: WarlockRestfulOptions) => {
  const now = Date.now();

  const { name, saveTo } = options;

  options.className ||= namesFactory.restfulClassName(name);
  options.exportName ||= namesFactory.restfulExportName(name);
  options.repository ||= namesFactory.repositoryClassName(name);
  options.repositoryPath ||= namesFactory.repositoryFilePath(name);
  options.model ||= namesFactory.modelClassName(name);
  options.modelPath ||= `./../models/${namesFactory.modelFolderPath(name)}`;

  ensureDirectory(saveTo);

  options.fileName ||= namesFactory.restfulFilePath(name);

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
    ` ${chalk.green(
      options.className,
    )} has been generated successfully in ${chalk.cyan(
      saveTo + "/" + options.fileName,
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
