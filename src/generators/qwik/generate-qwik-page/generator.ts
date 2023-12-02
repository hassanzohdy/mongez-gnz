import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { ltrim, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "src/factories/names-factory";
import { throwIf } from "../../../utils";
import { gnQwikPage } from "./template";
import { QwikPageOptions } from "./types";

export const generate = async (options: QwikPageOptions) => {
  const name = toStudlyCase(ltrim(options.name, "/"));

  const now = Date.now();

  const content = await gnQwikPage(options);
  const { saveTo } = options;

  const componentName = namesFactory.qwikPageComponent(name);
  const componentPath = namesFactory.qwikPath(name);

  ensureDirectory(saveTo + "/" + componentPath);

  const componentFullPath = path.join(saveTo, componentPath, "index.tsx");

  throwIf(
    fileExists(componentFullPath),
    `${chalk.green("index.tsx")} file already exists in ${chalk.yellow(
      saveTo + "/" + componentPath,
    )}`,
  );

  putFile(componentFullPath, content);

  console.log(
    `Component ${chalk.green(
      componentName,
    )} page has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), componentPath))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
