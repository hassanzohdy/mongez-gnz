import { trim } from "@mongez/reinforcements";
import { Command } from "commander";
import basePath from "path";
import { generateMongoDBModel } from "../..";
import { gnz } from "./../../../../main";

export const generateMongoDBModelCommand = new Command("gn:model")
  .arguments("<name>")
  .option("-c, --class-name <className>", "Model Class name")
  .option("-p, --path <path>", "Path to save the component to")
  .option(
    "-wi, --with-index <withIndex>",
    "Whether to generate an index file or not",
  )
  .option("-fn, --file-name <fileName>", "File name")
  .option(
    "-c, --columns <columns>",
    "Columns types: column=type,column2=type2...",
  )
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
  .option(
    "-m, --migration <withMigration>",
    "Whether to generate a migration file or not",
  )
  .action(async (name, options) => {
    const {
      className,
      index,
      path,
      fileName,
      migration,
      columns,
      geo,
      text,
      unique,
      indexes,
    } = options;

    const columnList = columns
      ? columns.split(",").reduce((prev, current) => {
          const [key, value] = current.split("=");
          prev[trim(key)] = trim(value);
          return prev;
        }, {})
      : {};

    await gnz.execute(
      generateMongoDBModel.execute({
        collection: name,
        className,
        columns: columnList,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        withIndex: index !== "false",
        fileName,
        withMigration: migration !== "false",
        geo: geo ? geo.split(",") : [],
        text: text ? text.split(",") : [],
        unique: unique ? unique.split(",") : [],
        index: indexes ? indexes.split(",") : [],
      }),
    );
  });
