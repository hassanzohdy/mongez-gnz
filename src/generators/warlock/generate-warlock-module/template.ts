import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import pluralize from "pluralize";
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
  const moduleListHandler = `get${toStudlyCase(pluralize(options.name))}`;
  const moduleListHandlerPath = `./controllers/get-${toKebabCase(
    pluralize(options.name),
  )}`;

  const singleHandlerName = `get${toStudlyCase(pluralize(options.name, 1))}`;
  const singleHandlerPath = `./controllers/get-${toKebabCase(
    pluralize(options.name, 1),
  )}`;

  const route = `/${toKebabCase(pluralize(options.name))}`;

  const restful = `restful${toStudlyCase(pluralize(options.name))}`;

  const content = `
  import { router } from "@warlock.js/core";
  import { guardedAdmin, publicRoutes } from "app/utils/router";
  import ${moduleListHandler} from "${moduleListHandlerPath}";
  import ${singleHandlerName} from "${singleHandlerPath}";
  import ${restful} from "./controllers/restful-${toKebabCase(
    pluralize(options.name),
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
