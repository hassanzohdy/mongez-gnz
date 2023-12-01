import { ensureDirectory, fileExists, putFile } from "@mongez/fs";
import { ltrim, toStudlyCase } from "@mongez/reinforcements";
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
  const { name: _name, saveTo } = options;

  const name = ltrim(_name, "/");

  const componentName = namesFactory.qwikPageComponent(name);

  ensureDirectory(saveTo + "/" + name);

  const componentFullPath = path.join(saveTo, name, "index.tsx");

  throwIf(
    fileExists(componentFullPath),
    `${chalk.green("index.tsx")} file already exists in ${chalk.yellow(
      saveTo + "/" + name,
    )}`,
  );

  putFile(componentFullPath, content);

  console.log(
    `Component ${chalk.green(
      componentName,
    )} page has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), name))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
