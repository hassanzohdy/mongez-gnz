import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "src/factories/names-factory";
import { throwIf } from "../../../utils";
import { gnQwikPage } from "./template";
import { QwikPageOptions } from "./types";

export const generate = async (options: QwikPageOptions) => {
  options.name = toStudlyCase(options.name);

  const now = Date.now();

  const content = await gnQwikPage(options);
  const { name, saveTo } = options;

  const componentName = namesFactory.qwikPageComponent(name);
  const componentPath = namesFactory.qwikPagePath(name);

  ensureDirectory(saveTo);

  const componentFullPath = path.join(saveTo, `${componentPath}.tsx`);

  throwIf(
    fileExists(componentFullPath),
    `Component ${chalk.green(componentName)} already exists in ${chalk.yellow(
      saveTo,
    )}`,
  );

  putFile(componentFullPath, content);

  console.log(
    `Component ${chalk.green(
      componentName,
    )} has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), componentPath))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
