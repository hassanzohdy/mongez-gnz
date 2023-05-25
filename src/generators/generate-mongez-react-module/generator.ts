// This file is responsible for generating the code template.
// It is called when user calls this generator.
// Code template should not be added here, use 'template.ts' instead then get the output
// of the function and put it in the file here, this makes it easier to maintain your generator.
import concatRoute from "@mongez/concat-route";
import { directoryExists, ensureDirectory, putFile } from "@mongez/fs";
import { toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { generateGenerateClientServiceFile } from "../generate-client-service-file";
import { generateReactComponent } from "../generate-react-component";
import { gnz } from "./../../main";
import { showSpinner, throwIf } from "./../../utils";
import {
  getProviderTemplate,
  getRoutesTemplate,
  updateUrlsFile,
} from "./template";
import { MongezReactModuleGeneratorOptions } from "./types";

function prepareOptions(options: MongezReactModuleGeneratorOptions) {
  options.serviceRoutePath ??= concatRoute(toKebabCase(options.name));
  options.pageComponentName ??= toStudlyCase(options.name) + "Page";
  options.detailsPageComponentName ??=
    toStudlyCase(options.name) + "DetailsPage";
  options.saveTo = path.resolve(options.saveTo, options.appName, options.name);
}

export async function generate(optionsList: MongezReactModuleGeneratorOptions) {
  // this is just an example, you can remove it.

  prepareOptions(optionsList);

  const { saveTo } = optionsList;

  throwIf(
    directoryExists(saveTo),
    `Module ${chalk.redBright(optionsList.name)} already exists.`,
  );

  // make sure the directory exists
  ensureDirectory(saveTo);

  // use loader to show a spinner while generating the content
  let loader = showSpinner(`Generating ${chalk.yellow("service")} ...`);

  // generate the service
  await gnz.execute(
    generateGenerateClientServiceFile.execute({
      saveTo: saveTo + "/services",
      name: optionsList.name,
      route: optionsList.serviceRoutePath,
    }),
  );

  // stop the loader
  loader.stop(`Generated ${chalk.green("service")} successfully.`);

  loader = showSpinner(
    `Generating ${chalk.yellow("React Page Component")} ...`,
  );

  // generate React page

  await gnz.execute(
    generateReactComponent.execute({
      saveTo: saveTo + "/pages",
      withIndex: optionsList.withIndex,
      name: optionsList.pageComponentName as string,
      memo: optionsList.memo,
      forwardRef: optionsList.forwardRef,
      imports: [
        `import Helmet from "@mongez/react-helmet";`,
        `import { trans } from "@mongez/localization";`,
      ],
      beforeRenderContent: `
        const title = trans("${optionsList.detailsPageComponentName}");
      `,
      renderContent: `
      <>
        <Helmet title={title} />
        <h1>${optionsList.name} Page</h1>
      </>
    `,
    }),
  );

  // stop the loader
  loader.stop(`Generated ${chalk.green("React Page Component")} successfully.`);

  if (optionsList.withDetailsPage) {
    loader = showSpinner(
      `Generating ${chalk.yellow(optionsList.detailsPageComponentName)} ...`,
    );

    // generate React page

    await gnz.execute(
      generateReactComponent.execute({
        saveTo: saveTo + "/pages",
        withIndex: optionsList.withIndex,
        name: optionsList.detailsPageComponentName as string,
        memo: optionsList.memo,
        forwardRef: optionsList.forwardRef,
        imports: [
          `import Helmet from "@mongez/react-helmet";`,
          `import { trans } from "@mongez/localization";`,
          'import React from "react";',
        ],
        args: optionsList.forwardRef
          ? [`{params}: any`, `ref: React.Ref<any>`]
          : [`{params}: any`],
        beforeRenderContent: `
            const title = trans("${optionsList.detailsPageComponentName}");
          `,
        renderContent: `
      <>
        <Helmet title={title} />
        <h1>${optionsList.detailsPageComponentName} Page</h1>
      </>`,
      }),
    );

    loader.stop(
      `Generated ${chalk.green(
        optionsList.detailsPageComponentName,
      )} successfully.`,
    );
  }

  // generating provider
  loader = showSpinner(`Generating ${chalk.yellow("Provider")} ...`);
  const providerContent = await getProviderTemplate();

  putFile(saveTo + "/provider.tsx", providerContent);

  loader.stop(`Generated ${chalk.green("Provider")} successfully.`);

  // generating routes.ts file
  loader = showSpinner(`Generating ${chalk.yellow("routes.ts")} ...`);

  const routesContent = await getRoutesTemplate(optionsList);

  putFile(saveTo + "/routes.ts", routesContent);

  loader.stop(`Generated ${chalk.green("routes.ts")} successfully.`);

  if (optionsList.useUrls) {
    loader = showSpinner(`Updating ${chalk.yellow("urls.ts")} ...`);

    await updateUrlsFile(optionsList);

    loader.stop(`Updated ${chalk.green("urls.ts")} successfully.`);
  }
}
