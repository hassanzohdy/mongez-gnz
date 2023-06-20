import { Command } from "commander";
import basePath from "path";
import { generateWarlockRepository } from "../..";
import { gnz } from "../../../../../main";

export const newWarlockRepositoryCommand = new Command("warlock:repository")
  .arguments("<name>")
  .requiredOption(
    "-p, --path <path>",
    "Path to save the file to, relative to the project root",
  )
  .option(
    "-m, --model <model>",
    "Model name, if not provided, it will be generated from the repository name",
  )
  .option(
    "-mp, --modelPath <modelPath>",
    "Model path, if not provided, it will be generated from the repository name",
  )
  .option(
    "-c, --className <className>",
    "Class name, if not provided, it will be generated from the repository name",
  )
  .option(
    "-e, --exportName <exportName>",
    "Export name, if not provided, it will be generated from the repository name",
  )
  .option("-f, --filters <filters>", "Filters, email:like,id:int,name:=")
  .option("-f, --fileName <fileName>", "File name")
  .action(async (name, options) => {
    const { path, fileName, filters, className, model, modelPath, exportName } =
      options;

    const filtersKeysList: any = {};

    if (filters) {
      const keys = filters.split(",");

      keys.forEach(key => {
        const [keyName, keyType] = key.split(":");

        if (!keyName) return;
        if (!keyType) return;

        filtersKeysList[keyName] = keyType;
      });
    }

    await gnz.execute(
      generateWarlockRepository.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        fileName,
        filters: filtersKeysList,
        className,
        model,
        modelPath,
        exportName,
      }),
    );
  });
