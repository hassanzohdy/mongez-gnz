import { Command } from "commander";
import basePath from "path";
import { generateWarlockHandler } from "../..";
import { gnz } from "../../../../../main";

export const newWarlockHandlerCommand = new Command("warlock:handler")
  .arguments("<name>")
  .requiredOption(
    "-p, --path <path>",
    "Path to save the file to, relative to the project root",
  )
  .option(
    "-wv, --withValidation <withValidation>",
    "If set to true, the handler will be generated with validation",
  )
  .option("-f, --rules <rules>", "rules, email:like,id:int,name:=")
  .option("-f, --fileName <fileName>", "File name")
  .action(async (name, options) => {
    const { path, fileName, rules, withValidation } = options;

    const rulesKeysList: any = {};

    if (rules) {
      const keys = rules.split(",");

      keys.forEach(key => {
        const [keyName, keyType] = key.split(":");

        if (!keyName) return;
        if (!keyType) return;

        rulesKeysList[keyName] = keyType;
      });
    }

    await gnz.execute(
      generateWarlockHandler.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        fileName,
        rules: rulesKeysList,
        withValidation,
      }),
    );
  });
