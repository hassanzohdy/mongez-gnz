import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "../../../factories/names-factory";
import { throwIf } from "../../../utils";
import { gnWarlockRepository } from "./template";
import { WarlockRepositoryOptions } from "./types";

export const generate = async (options: WarlockRepositoryOptions) => {
  const now = Date.now();

  const { name, saveTo } = options;

  options.className ||= namesFactory.repositoryClassName(name);
  options.exportName ||= namesFactory.repositoryExportName(name);
  options.model ||= namesFactory.modelClassName(name);
  options.modelPath ||= `./../models/${namesFactory.modelFolderPath(name)}`;

  ensureDirectory(saveTo);

  options.fileName ||= namesFactory.repositoryFilePath(name);

  const repositoryFilePath = options.fileName + ".ts";

  const Path = path.join(saveTo, repositoryFilePath);

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
