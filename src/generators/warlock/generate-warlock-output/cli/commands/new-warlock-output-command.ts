import { Command } from "commander";
import basePath from "path";
import { generateWarlockOutput } from "../..";
import { gnz } from "./../../../../../main";

export const newWarlockOutputCommand = new Command("warlock:output")
  .arguments("<name>")
  .option(
    "-p, --path <path>",
    "Path to save the file to, relative to the project root",
  )
  .option("-we, --withExtend <withExtend>", "Whether add extend method or not")
  .option(
    "-wo, --withBaseOutputDetails <withBaseOutputDetails>",
    "Whether to merge output keys with base output",
  )
  .option(
    "-o, --outputKeys <outputKeys>",
    'Output keys, separated by comma, e.g. "name:string,age:number"',
  )
  .option("-f, --fileName <fileName>", "File name")
  .action(async (name, options) => {
    const { withExtend, path, withBaseOutputDetails, fileName, outputKeys } =
      options;

    const outputKeysList: any = {};

    if (outputKeys) {
      const keys = outputKeys.split(",");

      keys.forEach(key => {
        const [keyName, keyType] = key.split(":");

        if (!keyName) return;
        if (!keyType) return;

        outputKeysList[keyName] = keyType;
      });
    }

    await gnz.execute(
      generateWarlockOutput.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        withExtend: withExtend !== "false",
        withBaseOutputDetails: withBaseOutputDetails !== "false",
        fileName,
        outputKeys: outputKeysList,
      }),
    );
  });
