import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import {
  rtrim,
  toCamelCase,
  toKebabCase,
  toStudlyCase,
} from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { generateMongoDBMigration } from "../generate-mongodb-migration";
import { throwIf } from "./../../utils";
import { generateModelContent, generateModelIndexContent } from "./template";
import { MongoDBModelGeneratorOptions } from "./types";

export const generate = async (options: MongoDBModelGeneratorOptions) => {
  options.collection = pluralize(toCamelCase(options.collection));
  options.className ||= toStudlyCase(pluralize(options.collection, 1));
  options.fileName ||= toKebabCase(pluralize(options.collection, 1)) + ".ts";

  ensureDirectory(options.saveTo);

  throwIf(
    fileExists(path.join(options.saveTo, options.fileName)),
    `Model file ${options.fileName} already exists`,
  );

  console.log(`Generating ${chalk.cyan(options.className)} model...`);

  const modelContent = await generateModelContent(options);

  if (options.withMigration) {
    const savePath = options.withIndex
      ? options.saveTo + "/" + rtrim(options.fileName, ".ts")
      : options.saveTo;

    await generateMongoDBMigration.generate({
      modelClass: options.className,
      modelPath: rtrim(options.fileName, ".ts"),
      saveTo: savePath + "/migrations",
      name: options.className,
      geo: options.geo,
      index: options.index,
      text: options.text,
      unique: options.unique,
    });
  }

  // first we need to check if model will be in a directory
  // then we need to check if the directory exists
  if (options.withIndex) {
    const directoryName = rtrim(options.fileName, ".ts");

    ensureDirectory(path.join(options.saveTo, directoryName));

    throwIf(
      fileExists(path.join(options.saveTo, directoryName, options.fileName)),
      `Model file ${options.fileName} already exists in ${directoryName} directory`,
    );

    const indexContent = await generateModelIndexContent(options);

    putFile(path.join(options.saveTo, directoryName, "index.ts"), indexContent);

    options.fileName = directoryName + "/" + options.fileName;
  }

  putFile(
    path.join(options.saveTo, rtrim(options.fileName, ".ts") + ".model.ts"),
    modelContent,
  );

  console.log(
    `${chalk.green(options.className)} model has been generated successfully`,
  );

  return {
    ...options,
  };
};
