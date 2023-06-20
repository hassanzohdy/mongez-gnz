import { getFile } from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import pluralize from "pluralize";
import { format } from "./../../utils";
import { ReactMongezOptions } from "./types";

export async function generateRoutesFile(
  options: ReactMongezOptions & {
    saveComponentsIn: string;
  },
) {
  //
  const saveComponentsIn = options.saveComponentsIn;

  const singleName = pluralize(options.name, 1);

  const imports = [
    `import URLS from "apps/${options.appName}/utils/urls";`,
    `import { publicRoutes } from "apps/${options.appName}/utils/router";`,
    `import ${toStudlyCase(
      options.name,
    )}Page from "./${saveComponentsIn}/${toStudlyCase(options.name)}Page";`,
  ];

  let publicRoutes = `
    publicRoutes([
      {
        path: URLS.${toCamelCase(options.name)},
        component: ${toStudlyCase(options.name)}Page,
      }
    ]);
  `;

  if (options.withDetailsPage) {
    imports.push(
      `import ${toStudlyCase(
        singleName,
      )}DetailsPage from "./${saveComponentsIn}/${toStudlyCase(
        singleName,
      )}DetailsPage";`,
    );

    publicRoutes = `
      publicRoutes([        
        {
          path: URLS.${toCamelCase(options.name)}.list,
          component: ${toStudlyCase(options.name)}Page,
        },
        {
          path: URLS.${toCamelCase(options.name)}.viewRoute,
          component: ${toStudlyCase(singleName)}DetailsPage,
        },
      ]);
    `;
  }

  const contents = `
    ${imports.join("\n")}

    ${publicRoutes}
  `;

  return await format.typescript(contents);
}

export async function updateUrlsFile(
  options: ReactMongezOptions & {
    urlsFilePath: string;
  },
) {
  // get file content
  const contents = getFile(options.urlsFilePath);

  // let's prepare first the replacement content
  let replacementContent = `const URLS = {
    `;

  if (options.withDetailsPage) {
    const singleDetailsName = pluralize(toCamelCase(options.name), 1);
    const viewDetailsKey = `${toStudlyCase(singleDetailsName)}`;

    replacementContent += `
      ${toCamelCase(options.name)}: {
        list: "/${toKebabCase(options.name)}",
        viewRoute: "/${toKebabCase(options.name)}/:id",
        view${viewDetailsKey}: (${singleDetailsName}: any) => \`/${toKebabCase(
      options.name,
    )}/\${${singleDetailsName}.id}\`,
      },
      `;
  } else {
    replacementContent += `
      ${toCamelCase(options.name)}: "/${toKebabCase(options.name)}",
      `;
  }

  // now look for `const URLS = {`

  const finalContent = contents.replace(
    /const URLS = {/,
    replacementContent.trim(),
  );

  return await format.typescript(finalContent);
}
