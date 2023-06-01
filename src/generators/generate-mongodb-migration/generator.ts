import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { toKebabCase } from "@mongez/reinforcements";
import path from "path";
import { throwIf } from "./../../utils";
import { generateMigrationTemplate } from "./template";
import { MongoDBMigrationOptions } from "./types";
import { utilizeMigration } from "./utilizer";

export const generate = async ({
  name,
  modelClass,
  modelPath = "./" + toKebabCase(modelClass),
  unique = [],
  index = [],
  text = [],
  geo = [],
  fileName = name + ".ts",
  uniqueId = true,
  saveTo,
}: MongoDBMigrationOptions) => {
  ensureDirectory(saveTo);

  const migrationFilePath = path.join(saveTo, `${name}.ts`);

  throwIf(
    fileExists(migrationFilePath),
    `Migration file ${name}.ts already exists`,
  );

  const {
    indexes,
    indexesDown,
    modelFileName,
    bluePrintClassName,
    migrationFunctionName,
  } = utilizeMigration({
    geo,
    index,
    modelClass,
    modelPath,
    text,
    unique,
    uniqueId,
  });

  const modelContent = await generateMigrationTemplate({
    indexes,
    indexesDown,
    modelClass,
    modelFileName,
    bluePrintClassName,
    migrationFunctionName,
  });

  putFile(path.join(saveTo, fileName), modelContent);
};
