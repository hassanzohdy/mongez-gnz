import { Command } from "commander";
import basePath from "path";
import { generateReactMongez } from "../..";
import { gnz } from "../../../../main";

export const newReactMongezCommand = new Command("react:mongez")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the module to")
  .option("-wdp, --without-details-page", "Generate without details page")
  .option("-au, --add-to-app-modules", "Add the module to app-modules.json")
  .option("-ur, --update-urls", "Update urls.ts file")
  .option(
    "-up, --using-pages",
    "Separate components directory from pages directory",
  )

  .action(async (name, options) => {
    const {
      path,
      withoutDetailsPage,
      addToAppModules,
      updateUrls,
      usingPages,
    } = options;

    await gnz.execute(
      generateReactMongez.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        withDetailsPage: withoutDetailsPage !== "false",
        addToAppModules: addToAppModules !== "false",
        updateUrls: updateUrls !== "false",
        usingPages: usingPages !== "false",
      }),
    );
  });
