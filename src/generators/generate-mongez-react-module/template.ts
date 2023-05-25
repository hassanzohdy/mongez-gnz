// This file is responsible for generating the code template.
// This file is auto imported by default in generator.ts file.
// If you're going to generate a single file, you can put the code template here directly.
// If the generated template is huge, create a directory called 'template' and create 'index.ts' file inside it,
// then collect all templates and export it from 'index.ts' file,
// Put each template file in a separate file then collected them all here.
// If you're going to generate multiple but small files, you can create functions in this file directly.
import concatRoute from "@mongez/concat-route";
import { fileExists, getFile, putFile } from "@mongez/fs";
import {
  ltrim,
  toCamelCase,
  toKebabCase,
  toStudlyCase,
} from "@mongez/reinforcements";
import path from "path";
import { singular } from "pluralize";
import { format, throwIf } from "../../utils";
import { MongezReactModuleGeneratorOptions } from "./types";

export async function getTemplateContents(
  optionsList: MongezReactModuleGeneratorOptions,
) {
  const contents = `// Add the content here
  `;

  // prettify the content
  return await format.typescript(contents);
}

export async function getProviderTemplate() {
  return await format.typescript(`
    import "./routes";
  `);
}

export async function getRoutesTemplate({
  routePath,
  appName,
  pageComponentName,
  detailsPageComponentName,
  withDetailsPage,
  useUrls,
  name,
  lazy,
  guarded,
}: MongezReactModuleGeneratorOptions) {
  const routesWrapperMethod = guarded ? "publicRoutes" : "guardedRoutes";

  const imports = [
    `import { ${routesWrapperMethod} } from "apps/${appName}/utils/router";`,
  ];

  if (useUrls) {
    imports.push(`import URLS from "apps/${appName}/utils/urls";`);
  }

  let content = "";

  const routesList: string[] = [];

  const routePathContent = !useUrls
    ? `"${routePath}"`
    : `URLS.${toCamelCase(name)}`;

  let detailsRoutePath = "";

  if (withDetailsPage) {
    detailsRoutePath = !useUrls
      ? `"${routePath}/:id"`
      : `URLS.view${singular(toStudlyCase(name))} + "Route"`;
  }

  if (lazy) {
    routesList.push(
      `
      {
        path: ${routePathContent},
        component: React.lazy(() => import("./pages/${pageComponentName}")),
      }`,
    );

    if (withDetailsPage) {
      routesList.push(
        `
        {
          path: ${detailsRoutePath}/:id,
          component: React.lazy(() => import("./pages/${detailsPageComponentName}")),
        }`,
      );
    }

    imports.push(`import React from "react";`);
    content = `
    ${imports.join("\n")}

    ${routesWrapperMethod}([
      ${routesList.join(",\n")},
    ]);  
    `;
  } else {
    imports.push(
      `import ${pageComponentName} from "./pages/${pageComponentName}";`,
    );

    routesList.push(
      `{
        path: ${routePathContent},
        component: ${pageComponentName},
    }`,
    );

    if (withDetailsPage) {
      imports.push(
        `import ${detailsPageComponentName} from "./pages/${detailsPageComponentName}";`,
      );

      routesList.push(
        `{
          path: ${detailsRoutePath},
          component: ${detailsPageComponentName},
      }`,
      );
    }

    content = `
      ${imports.join("\n")}
      
      ${routesWrapperMethod}([
        ${routesList.join(",\n")},
    ]);
    `;
  }

  return await format.typescript(content);
}

export async function updateUrlsFile(
  optionsList: MongezReactModuleGeneratorOptions,
) {
  const urlsFilePath = `apps/${optionsList.appName}/utils/urls.ts`;
  const fullPath = path.resolve(process.cwd(), "src", urlsFilePath);

  throwIf(!fileExists(fullPath), `URLS file not found in ${urlsFilePath}`);

  let content: string = getFile(fullPath);

  // now search for URLS = { and add the routes to it.
  const pageRouteKey = toCamelCase(optionsList.name);
  const routePath =
    "/" +
    ltrim(
      concatRoute(
        String(optionsList.routePath) || toKebabCase(optionsList.name),
      ),
      "/",
    );

  content = content.replace(
    `URLS = {`,
    `
    URLS = {
      ${pageRouteKey}: "${routePath}",
    `,
  );

  if (optionsList.withDetailsPage) {
    const viewPage = `view${toStudlyCase(singular(optionsList.name))}`;

    const detailsPageRouteKey = `${viewPage}Route`;
    const detailsPageRoutePath = `${routePath}/:id`;
    const singlePageObjectKey = `${toCamelCase(singular(optionsList.name))}`;
    const detailsPageRoute = `\`${routePath}/\${${singlePageObjectKey}.id}\``;

    content = content.replace(
      `${pageRouteKey}: "${routePath}",`,
      `
      ${pageRouteKey}: "${routePath}",
      ${detailsPageRouteKey}: "${detailsPageRoutePath}",
      view${viewPage}: (${singlePageObjectKey}: any) => ${detailsPageRoute},
      `,
    );

    putFile(fullPath, await format.typescript(content));
  }
}
