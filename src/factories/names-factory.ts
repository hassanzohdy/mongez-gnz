import {
  ltrim,
  toCamelCase,
  toKebabCase,
  toStudlyCase,
} from "@mongez/reinforcements";
import pluralize from "pluralize";

export const namesFactory = {
  qwikComponent(name: string) {
    return toStudlyCase(name);
  },
  qwikPath(name: string) {
    return toKebabCase(name);
  },
  qwikPageComponent(name: string) {
    return toStudlyCase(
      name.replaceAll(/\(|\)|\[|\]|\./g, "").replaceAll("/", "_"),
    );
  },
  qwikPagePath(name: string) {
    return ltrim(name, "/");
  },
  // Warlock.js
  routePath(name: string) {
    return `/${toKebabCase(pluralize(name))}`;
  },
  repositoryClassName(name: string) {
    name = name.replace(/Repository$/i, "");
    return `${pluralize(toStudlyCase(name))}Repository`;
  },
  repositoryExportName(name: string) {
    name = name.replace(/Repository$/i, "");
    return `${pluralize(toCamelCase(name))}Repository`;
  },
  repositoryFilePath(name: string) {
    name = name.replace(/Repository$/i, "");
    return `${toKebabCase(pluralize(name))}.repository`;
  },
  // Database Model
  modelTableName(name: string) {
    return toKebabCase(pluralize(name, 1));
  },
  modelClassName(name: string) {
    name = name.replace(/Model$/i, "");
    return toStudlyCase(pluralize(name, 1));
  },
  modelFilePath(name: string) {
    name = name.replace(/Model$/i, "");
    return `${toKebabCase(pluralize(name, 1))}.model`;
  },
  modelFolderPath(name: string) {
    return toKebabCase(pluralize(name, 1));
  },
  // Output
  outputFilePath(name: string) {
    name = name.replace(/Output$/i, "");
    return `${toKebabCase(pluralize(name, 1))}.output`;
  },
  outputClassName(name: string) {
    name = name.replace(/Output$/i, "");
    return `${toStudlyCase(pluralize(name, 1))}Output`;
  },
  // Restful
  restfulClassName(name: string) {
    return `Restful${toStudlyCase(pluralize(name))}`;
  },
  restfulExportName(name: string) {
    return `restful${toStudlyCase(pluralize(name))}`;
  },
  restfulFilePath(name: string) {
    return `${toKebabCase(pluralize(name))}.restful`;
  },
  controllerName(name: string) {
    name = name.replace(/Controller$/i, "");
    return `get${toStudlyCase(pluralize(name))}Controller`;
  },
  controllerFilePath(name: string) {
    name = name.replace(/Controller$/i, "");
    return `${toKebabCase(pluralize(name))}.controller`;
  },
};
