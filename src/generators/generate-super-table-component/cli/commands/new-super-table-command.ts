import { Command } from "commander";
import basePath from "path";
import { generateSuperTableComponent } from "../..";
import { gnz } from "../../../../main";

export const newSuperTableCommand = new Command("reactive:table")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the component to")
  .option("-m, --memo <memo>", "Whether to use memo or not")
  .option("-c, --columns <columns>", "Inputs to add to the component")
  .option("-sp, --service-path <servicePath>", "Path to the service")
  .option("-s, --service-name <serviceName>", "Name of the service")
  .option("-i, --index <withIndex>", "Whether to generate an index file or not")
  .action(async (name, options) => {
    const { memo, index, path, columns, servicePath, serviceName } = options;

    const columnsList: any = {};

    if (columns) {
      // input will be name.string.required,email.email.required
      // so we just need to split the name to be the key object and the rest of the string to be its value
      columns.split(",").forEach((input: string) => {
        const [inputName, ...restOfTypes] = input.split(".");

        columnsList[inputName] = restOfTypes.join(".");
      });
    }

    await gnz.execute(
      generateSuperTableComponent.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        memo: memo !== "false",
        withIndex: index !== "false",
        columns: columnsList,
        serviceName,
        servicePath,
      }),
    );
  });
