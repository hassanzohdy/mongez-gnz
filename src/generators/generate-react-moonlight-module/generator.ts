import {
  directoryExists,
  ensureDirectory,
  fileExists,
  getJsonFile,
  makeDirectory,
  putFile,
  putJsonFile,
} from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { throwIf } from "../..//utils";
import { gnz } from "../../main";
import { generateGenerateClientRestfulService } from "../generate-client-restful-service";
import { generateReactiveFormComponent } from "../generate-reactive-form-component";
import { generateSuperTableComponent } from "../generate-super-table-component";
import { generateRoutesFile, updateUrlsFile } from "./template";
import { ReactMoonlightOptions } from "./types";

export const generate = async (options: ReactMoonlightOptions) => {
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

  // create service file
  await gnz.execute(
    generateGenerateClientRestfulService.execute({
      name: options.name,
      saveTo: directoryPath + "/services",
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

  const formComponentName = toStudlyCase(pluralize(options.name, 1)) + "Form";

  // now let's generate the super table page
  await gnz.execute(
    generateSuperTableComponent.execute({
      saveTo: directoryPath + "/" + saveComponentsIn,
      name: options.name,
      asPage: true,
      columns: options.inputs || {
        name: "string",
      },
      memo: true,
      withIndex: true,
      serviceName: toCamelCase(options.name) + "Service",
      formComponentName: formComponentName,
      formComponentPath: `./${formComponentName}`,
      servicePath: `apps/${options.appName}/${toKebabCase(
        options.name,
      )}/services/${toKebabCase(options.name)}-service`,
    }),
  );

  // now create the reactive form
  await gnz.execute(
    generateReactiveFormComponent.execute({
      saveTo:
        directoryPath + "/" + saveComponentsIn + "/" + options.name + "Page",
      name: formComponentName,
      memo: true,
      withIndex: true,
      singleName: pluralize(options.name, 1),
      inputs: options.inputs || {
        name: "string",
      },
      serviceName: toCamelCase(options.name) + "Service",
      servicePath: `apps/${options.appName}/${toKebabCase(
        options.name,
      )}/services/${toKebabCase(options.name)}-service`,
    }),
  );

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
