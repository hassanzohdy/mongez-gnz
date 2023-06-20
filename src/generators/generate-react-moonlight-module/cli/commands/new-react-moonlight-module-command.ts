import { Command } from "commander";
import basePath from "path";
import { generateMoonlightModule } from "../..";
import { gnz } from "../../../../main";

export const newMoonlightModuleCommand = new Command("moonlight")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the module to")
  .option("-wdp, --without-details-page", "Generate without details page")
  .option("-au, --add-to-app-modules", "Add the module to app-modules.json")
  .option("-i, --inputs <inputs>", "Inputs to add to the module")
  .option("-ur, --update-urls", "Update urls.ts file")
  .option(
    "-up, --using-pages",
    "Separate components directory from pages directory",
  )

  .action(async (name, options) => {
    const { path, addToAppModules, updateUrls, inputs, usingPages } = options;

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
      generateMoonlightModule.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        addToAppModules: addToAppModules !== "false",
        updateUrls: updateUrls !== "false",
        usingPages: usingPages !== "false",
        inputs: inputsList,
      }),
    );
  });
