import { trim } from "@mongez/reinforcements";
import { Command } from "commander";
import basePath from "path";
import { generateWarlockModule } from "../..";
import { gnz } from "../../../../../main";

export const newWarlockModuleCommand = new Command("warlock:module")
  .arguments("<name>")
  .requiredOption(
    "-p, --path <path>",
    "Path to save the file to, relative to the project root",
  )
  .option(".e, --withEvents <withEvents>", "Generate events file")
  .option("-l, --withLocales <withLocales>", "Generate locales file")
  .option(
    "-c, --columns <columns>",
    "Columns types: column=type,column2=type2...",
  )
  .action(async (name, options) => {
    const { path, columns, withLocales, withEvents } = options;
    const columnList = columns
      ? columns.split(",").reduce((prev, current) => {
          const [key, value] = current.split(":");
          prev[trim(key)] = trim(value);
          return prev;
        }, {})
      : {};

    await gnz.execute(
      generateWarlockModule.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        columns: columnList,
        withEvents: withEvents !== "false",
        withLocales: withLocales !== "false",
      }),
    );
  });
