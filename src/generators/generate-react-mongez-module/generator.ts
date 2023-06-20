import {
  directoryExists,
  ensureDirectory,
  fileExists,
  getJsonFile,
  makeDirectory,
  putFile,
  putJsonFile,
} from "@mongez/fs";
import { toKebabCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { throwIf } from "../..//utils";
import { gnz } from "../../main";
import { generateGenerateClientServiceFile } from "../generate-client-service-file";
import { generateReactComponent } from "../generate-react-component";
import { generateRoutesFile, updateUrlsFile } from "./template";
import { ReactMongezOptions } from "./types";

export const generate = async (options: ReactMongezOptions) => {
  options.name = toKebabCase(options.name);

  const now = Date.now();

  const { saveTo } = options;

  const directoryPath = saveTo + "/" + options.name;

  options.appName ||= toKebabCase(path.basename(options.saveTo));

  throwIf(
    directoryExists(directoryPath),
    chalk.redBright(options.name) +
      " directory exists in " +
      chalk.yellow(saveTo),
  );

  ensureDirectory(saveTo + "/" + options.name);

  let endpointPath = "shared/endpoint";

  if (fileExists(saveTo + "/utils/endpoints.ts")) {
    endpointPath = `apps/${options.appName}/utils/endpoint`;
  } else if (fileExists(path.resolve(saveTo, "../", "shared/endpoint.ts"))) {
    endpointPath = "shared/endpoint";
  }

  // create service file
  await gnz.execute(
    generateGenerateClientServiceFile.execute({
      name: options.name,
      saveTo: directoryPath + "/services",
      endpointPath,
    }),
  );

  makeDirectory(directoryPath + "/utils");

  // create a types.ts file
  putFile(directoryPath + "/utils/types.ts", "// types.ts file");

  // create a locales.ts file
  putFile(directoryPath + "/utils/locales.ts", "// locales.ts file");

  makeDirectory(directoryPath + "/components");

  let saveComponentsIn = "components";

  if (options.usingPages) {
    makeDirectory(directoryPath + "/pages");

    saveComponentsIn = "pages";
  }

  // now create the page
  await gnz.execute(
    generateReactComponent.execute({
      saveTo: directoryPath + "/" + saveComponentsIn,
      name: options.name + "Page",
      memo: true,
      withIndex: true,
    }),
  );

  // now create the details page
  if (options.withDetailsPage) {
    await gnz.execute(
      generateReactComponent.execute({
        saveTo: directoryPath + "/" + saveComponentsIn,
        name: pluralize(options.name, 1) + "DetailsPage",
        memo: true,
        withIndex: true,
      }),
    );
  }

  // now let's create the provider.ts file
  putFile(directoryPath + "/provider.ts", `import "./routes";`);

  console.log(
    `Generating ${chalk.green("routes.ts")} file in ${chalk.yellow(
      directoryPath,
    )}`,
  );

  // now let's create the routes.ts file
  putFile(
    directoryPath + "/routes.ts",
    await generateRoutesFile({
      ...options,
      saveComponentsIn,
    }),
  );

  // now check if the app has teh $app-modules.json file
  // if so, then add to modules array a new object

  if (
    options.addToAppModules &&
    fileExists(saveTo + `/${options.appName}-modules.json`)
  ) {
    const content: any = getJsonFile(
      saveTo + `/${options.appName}-modules.json`,
    );

    content.modules.push({
      entry: [`/${toKebabCase(options.name)}`],
      name: options.name,
    });

    putJsonFile(saveTo + `/${options.appName}-modules.json`, content);
  }

  // now let's update the urls.ts file
  if (options.updateUrls && fileExists(saveTo + "/utils/urls.ts")) {
    console.log(
      `Updating ${chalk.green("urls.ts")} file in ${chalk.yellow(saveTo)}`,
    );
    putFile(
      saveTo + "/utils/urls.ts",
      await updateUrlsFile({
        ...options,
        urlsFilePath: saveTo + "/utils/urls.ts",
      }),
    );
  }

  console.log(
    `${chalk.green(
      options.name,
    )} module has been generated successfully. ${chalk.gray(
      `(${Date.now() - now}ms)`,
    )}`,
  );
};
