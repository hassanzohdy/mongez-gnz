import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "../../factories/names-factory";
import { generateMongoDBMigration } from "../generate-mongodb-migration";
import { throwIf } from "./../../utils";
import { generateModelContent, generateModelIndexContent } from "./template";
import { MongoDBModelGeneratorOptions } from "./types";

export const generate = async (options: MongoDBModelGeneratorOptions) => {
  options.collection = namesFactory.modelTableName(options.collection);
  options.className ||= namesFactory.modelClassName(options.collection);
  options.fileName ||= namesFactory.modelFilePath(options.collection);
  const modelFilePath = options.fileName + ".ts";

  ensureDirectory(options.saveTo);

  throwIf(
    fileExists(path.join(options.saveTo, modelFilePath)),
    `Model file ${modelFilePath} already exists`,
  );

  console.log(`Generating ${chalk.cyan(options.className)} model...`);

  const modelContent = await generateModelContent(options);

  if (options.withMigration) {
    const savePath = options.withIndex
      ? options.saveTo + "/" + namesFactory.modelFolderPath(options.collection)
      : options.saveTo;

    await generateMongoDBMigration.generate({
      modelClass: options.className,
      modelPath: options.fileName,
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
    const directoryName = namesFactory.modelFolderPath(options.collection);

    ensureDirectory(path.join(options.saveTo, directoryName));

    throwIf(
      fileExists(path.join(options.saveTo, directoryName, modelFilePath)),
      `Model file ${modelFilePath} already exists in ${directoryName} directory`,
    );

    const indexContent = await generateModelIndexContent(options);

    putFile(path.join(options.saveTo, directoryName, "index.ts"), indexContent);

    options.fileName = directoryName + "/" + options.fileName;
  }

  putFile(path.join(options.saveTo, options.fileName + ".ts"), modelContent);

  console.log(
    `${chalk.green(options.className)} model has been generated successfully`,
  );

  return {
    ...options,
  };
};
