import {
  directoryExists,
  ensureDirectory,
  fileExists,
  makeDirectory,
  putFile,
} from "@mongez/fs";
import { toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import { namesFactory } from "src/factories/names-factory";
import { eslint, throwIf } from "./../../../utils";
import { gnQwikComponent } from "./template";
import { QwikComponentOptions } from "./types";

export const generate = async (options: QwikComponentOptions) => {
  options.name = toStudlyCase(options.name);

  const now = Date.now();

  const content = await gnQwikComponent(options);
  const { name, saveTo } = options;

  const componentName = namesFactory.qwikComponent(name);
  const componentPath = namesFactory.qwikPath(name);

  ensureDirectory(saveTo);

  // check now if there is a `withIndex` option
  // if so, then we'll need to generate an index file
  if (options.withIndex) {
    // create the directory
    const componentDirectoryPath = path.join(saveTo, componentPath);

    throwIf(
      directoryExists(componentDirectoryPath),
      `Directory ${chalk.yellow(
        componentDirectoryPath,
      )} already exists. Please remove it first, or use a different directory/name.`,
    );

    makeDirectory(componentDirectoryPath);

    // create the component file
    const componentFullPath = path.join(
      componentDirectoryPath,
      `${componentPath}.tsx`,
    );
    putFile(componentFullPath, content);

    eslint.formatFile(
      path.join(componentDirectoryPath, `${componentPath}.tsx`),
    );

    // create the index file
    const indexPath = path.join(componentDirectoryPath, "index.ts");
    const indexContent = `export { default } from "./${componentPath}";
`;

    putFile(indexPath, indexContent);

    eslint.formatFile(indexPath);

    // log for success creation of index file
    console.log(
      `Index file has been generated successfully in ${chalk.cyan(
        path.relative(process.cwd(), indexPath).replaceAll("\\", "/"),
      )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
    );
  } else {
    const componentFullPath = path.join(saveTo, `${componentPath}.tsx`);

    throwIf(
      fileExists(componentFullPath),
      `Component ${chalk.green(componentName)} already exists in ${chalk.yellow(
        saveTo,
      )}`,
    );

    putFile(componentFullPath, content);
  }

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
