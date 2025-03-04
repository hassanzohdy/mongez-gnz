import { toCamelCase } from "@mongez/reinforcements";
import pluralize from "pluralize";
import { namesFactory } from "../../../factories/names-factory";
import { format } from "../../../utils";
import { WarlockModuleOptions } from "./types";

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

export async function generateModuleRoutesContent(
  options: WarlockModuleOptions,
) {
  const moduleListHandler = namesFactory.controllerName("list-" + options.name);
  const moduleListHandlerPath = `./controllers/list-${namesFactory.controllerFilePath(
    options.name,
  )}`;

  const singleHandlerName = namesFactory.controllerName("get-" + options.name);
  const singleHandlerPath = `./controllers/get-${namesFactory.controllerFilePath(
    options.name,
  )}`;

  const route = namesFactory.routePath(options.name);

  const restful = namesFactory.restfulExportName(options.name);

  const content = `
  import { router } from "@warlock.js/core";
  import { guardedAdmin, publicRoutes } from "app/utils/router";
  import { ${moduleListHandler} } from "${moduleListHandlerPath}";
  import { ${singleHandlerName} } from "${singleHandlerPath}";
  import { ${restful} } from "./controllers/${namesFactory.restfulFilePath(
    options.name,
  )}";

  guardedAdmin(() => {
    router.restfulResource("${route}", ${restful});
  });
  
  publicRoutes(() => {
    router.get("${route}", ${moduleListHandler});
    router.get("${route}/:id", ${singleHandlerName});
  });`;

  return await format.typescript(content);
}
