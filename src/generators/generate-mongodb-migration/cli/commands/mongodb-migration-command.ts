import { Command } from "commander";
import basePath from "path";
import { generateMongoDBMigration } from "../..";
import { gnz } from "./../../../../main";

export const mongodbMigrationCommand = new Command("gn:migration")
  .arguments("<name>")
  .option("-p, --path <path>", "Save to path, relative to root directory")
  .option("-m, --model <name>", "Model class name")
  .option(
    "-i, --indexes <indexes>",
    "Column that will be indexed, separate with comma",
  )
  .option(
    "-u, --unique <unique>",
    "Column that will be unique, separate with comma",
  )
  .option(
    "-t, --text <text>",
    "Column that will be text indexed, separate with comma",
  )
  .option(
    "-g, --geo <geo>",
    "Column that will be geo indexed, separate with comma",
  )
  .action(async (name, options) => {
    const { model, path, indexes, unique, text, geo } = options;

    await gnz.execute(
      generateMongoDBMigration.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        modelClass: model,
        index: indexes ? indexes.split(",") : [],
        unique: unique ? unique.split(",") : [],
        text: text ? text.split(",") : [],
        geo: geo ? geo.split(",") : [],
      }),
    );
  });
