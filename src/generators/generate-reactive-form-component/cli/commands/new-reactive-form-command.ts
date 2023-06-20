import { Command } from "commander";
import basePath from "path";
import { generateReactiveFormComponent } from "../..";
import { gnz } from "../../../../main";

export const newReactComponentCommand = new Command("reactive:form")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the component to")
  .option("-m, --memo <memo>", "Whether to use memo or not")
  .option("-n, --inputs <inputs>", "Inputs to add to the component")
  .option("-sn, --single-name <singleName>", "Single name for the component")
  .option("-sp, --service-path <servicePath>", "Path to the service")
  .option("-s, --service-name <serviceName>", "Name of the service")
  .option("-i, --index <withIndex>", "Whether to generate an index file or not")
  .action(async (name, options) => {
    const { memo, index, path, inputs, singleName, servicePath, serviceName } =
      options;

    const inputsList: any = {};

    if (inputs) {
      // input will be name.string.required,email.email.required
      // so we just need to split the name to be the key object and the rest of the string to be its value
      inputs.split(",").forEach((input: string) => {
        const [inputName, ...restOfTypes] = input.split(".");

        inputsList[inputName] = restOfTypes.join(".");
      });
    }

    await gnz.execute(
      generateReactiveFormComponent.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        memo: memo !== "false",
        withIndex: index !== "false",
        inputs: inputsList,
        singleName,
        serviceName,
        servicePath,
      }),
    );
  });
