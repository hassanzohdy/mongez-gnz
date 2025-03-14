import { getFileAsync } from "@mongez/fs";
import { toCamelCase } from "@mongez/reinforcements";
import pluralize from "pluralize";
import { namesFactory } from "../../../factories/names-factory";
import { format } from "../../../utils";
import { WarlockModuleOptions } from "./types";

/**
 * Generate module controllers information
 */
function generateControllerInfo(options: WarlockModuleOptions) {
  const listControllerName = namesFactory.controllerName(
    "list-" + options.name,
  );
  const listControllerPath = `./controllers/${namesFactory.controllerFilePath(
    "list-" + options.name,
  )}`;

  const singleControllerName = namesFactory.controllerName(
    "get-" + options.name,
  );
  const singleControllerPath = `./controllers/${namesFactory.controllerFilePath(
    "get-" + options.name,
  )}`;

  const routePath = namesFactory.routePath(options.name);
  const restfulName = namesFactory.restfulExportName(options.name);
  const restfulPath = `./controllers/${namesFactory.restfulFilePath(
    options.name,
  )}`;

  return {
    listControllerName,
    listControllerPath,
    singleControllerName,
    singleControllerPath,
    routePath,
    restfulName,
    restfulPath,
  };
}

/**
 * Generate import statements for module controllers
 */
function generateImportStatements(
  controllers: ReturnType<typeof generateControllerInfo>,
  includeCore = true,
) {
  const imports: string[] = [];

  if (includeCore) {
    imports.push(`import { router } from "@warlock.js/core";`);
    imports.push(
      `import { guardedAdmin, publicRoutes } from "app/utils/router";`,
    );
  }

  imports.push(
    `import { ${controllers.listControllerName} } from "${controllers.listControllerPath}";`,
  );
  imports.push(
    `import { ${controllers.singleControllerName} } from "${controllers.singleControllerPath}";`,
  );
  imports.push(
    `import { ${controllers.restfulName} } from "${controllers.restfulPath}";`,
  );

  return imports.join("\n");
}

/**
 * Generate grouped admin routes content
 */
function generateAdminRoutesContent(
  controllers: ReturnType<typeof generateControllerInfo>,
) {
  return `router.restfulResource("${controllers.routePath}", ${controllers.restfulName});`;
}

/**
 * Generate grouped public routes content
 */
function generatePublicRoutesContent(
  controllers: ReturnType<typeof generateControllerInfo>,
) {
  return `router.get("${controllers.routePath}", ${controllers.listControllerName});
  router.get("${controllers.routePath}/:id", ${controllers.singleControllerName});`;
}

/**
 * Generate locales content
 */
export async function getLocalesContent(options: WarlockModuleOptions) {
  const content = `
  import { groupedTranslations } from "@mongez/localization";

  groupedTranslations("${toCamelCase(pluralize(options.name))}", {
    ${toCamelCase(pluralize(options.name))}: {
      en: "English Translation",
      ar: "Arabic Translation",
    }
  });
  `;

  return await format.typescript(content);
}

/**
 * Generate module routes content
 */
export async function generateModuleRoutesContent(
  options: WarlockModuleOptions,
) {
  const controllers = generateControllerInfo(options);

  const content = `
  ${generateImportStatements(controllers)}

  guardedAdmin(() => {
    ${generateAdminRoutesContent(controllers)}
  });
  
  publicRoutes(() => {
    ${generatePublicRoutesContent(controllers)}
  });`;

  return await format.typescript(content);
}

/**
 * Split a string after the last import statement
 */
function splitAfterLastImport(content: string) {
  const lastImportIndex = content.lastIndexOf("import ");

  if (lastImportIndex === -1) {
    return { before: "", after: content };
  }

  const lastImportEndIndex = content.indexOf(";", lastImportIndex) + 1;
  return {
    before: content.substring(0, lastImportEndIndex),
    after: content.substring(lastImportEndIndex),
  };
}

/**
 * Find or create admin routes block
 */
function findOrCreateAdminRoutesBlock(
  content: string,
  newRouteContent: string,
) {
  const adminBlockRegex = /guardedAdmin\(\(\)\s*=>\s*{([^}]*)}\);/;
  const match = content.match(adminBlockRegex);

  if (match) {
    // Insert into existing guardedAdmin block
    const blockContent = match[1];
    const updatedBlockContent = blockContent + "\n  " + newRouteContent;
    return content.replace(
      adminBlockRegex,
      `guardedAdmin(() => {${updatedBlockContent}});`,
    );
  }

  // If no guardedAdmin block, create one
  return content + `\n\nguardedAdmin(() => {\n  ${newRouteContent}\n});\n`;
}

/**
 * Find or create public routes block
 */
function findOrCreatePublicRoutesBlock(
  content: string,
  newRouteContent: string,
) {
  const publicBlockRegex = /publicRoutes\(\(\)\s*=>\s*{([^}]*)}\);/;
  const match = content.match(publicBlockRegex);

  if (match) {
    // Insert into existing publicRoutes block
    const blockContent = match[1];
    const updatedBlockContent = blockContent + "\n  " + newRouteContent;
    return content.replace(
      publicBlockRegex,
      `publicRoutes(() => {${updatedBlockContent}});`,
    );
  }

  // If no publicRoutes block, create one
  return content + `\n\npublicRoutes(() => {\n  ${newRouteContent}\n});\n`;
}

/**
 * Generate sub module routes content
 * This should append the module routes content to the routes file not replace it
 */
export async function generateSubModuleRoutesContent(
  options: WarlockModuleOptions,
  routesPath: string,
) {
  // First, get the existing route file content
  const routeFileContent = await getFileAsync(routesPath);

  // Generate controller information
  const controllers = generateControllerInfo(options);

  // Create imports (without core imports since they should already be in the file)
  const importStatements = generateImportStatements(controllers, false);

  // Add imports to the top of the file after existing imports
  const splitByLastImport = splitAfterLastImport(routeFileContent);
  let newContent =
    splitByLastImport.before +
    "\n" +
    importStatements +
    "\n" +
    splitByLastImport.after;

  // Generate route content
  const adminRouteContent = generateAdminRoutesContent(controllers);
  const publicRouteContent = generatePublicRoutesContent(controllers);

  // Find or create guardedAdmin block and insert the admin route
  newContent = findOrCreateAdminRoutesBlock(newContent, adminRouteContent);

  // Find or create publicRoutes block and insert the public routes
  newContent = findOrCreatePublicRoutesBlock(newContent, publicRouteContent);

  // Format the content before returning
  return await format.typescript(newContent);
}
