import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "../../../factories/names-factory";
import { throwIf } from "./../../../utils";
import { gnWarlockOutput } from "./template";
import { WarlockOutputOptions } from "./types";

export const generate = async (options: WarlockOutputOptions) => {
  const { saveTo } = options;

  const outputName = options.name;

  options.name = namesFactory.outputClassName(options.name);

  ensureDirectory(saveTo);

  options.fileName ||= namesFactory.outputFilePath(outputName);

  const outputFilePath = options.fileName + ".ts";

  const now = Date.now();

  const Path = path.join(saveTo, outputFilePath);

  throwIf(
    fileExists(Path),
    ` ${chalk.green(options.fileName)}.ts already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  const content = await gnWarlockOutput(options);
  putFile(Path, content);

  console.log(
    ` ${chalk.green(
      options.name,
    )} has been generated successfully in ${chalk.cyan(
      saveTo + "/" + outputFilePath,
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );

  return {
    ...options,
    path: Path,
  };
};
