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
import { eslint, throwIf } from "./../../utils";
import { gnReactComponent } from "./template";
import { ReactComponentOptions } from "./types";

export const generate = async (options: ReactComponentOptions) => {
  options.name = toStudlyCase(options.name);

  const now = Date.now();

  const content = await gnReactComponent(options);
  const { name: componentName, saveTo } = options;

  ensureDirectory(saveTo);

  // check now if there is a `withIndex` option
  // if so, then we'll need to generate an index file
  if (options.withIndex) {
    // create the directory
    const componentDirectoryPath = path.join(saveTo, componentName);

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
      `${componentName}.tsx`,
    );
    putFile(componentFullPath, content);

    eslint.formatFile(
      path.join(componentDirectoryPath, `${componentName}.tsx`),
    );

    // create the index file
    const indexPath = path.join(componentDirectoryPath, "index.ts");
    const indexContent = `export { default } from "./${componentName}";
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
    const componentPath = path.join(saveTo, `${componentName}.tsx`);

    throwIf(
      fileExists(componentPath),
      `Component ${chalk.green(componentName)} already exists in ${chalk.yellow(
        saveTo,
      )}`,
    );

    putFile(componentPath, content);
  }

  console.log(
    `Component ${chalk.green(
      componentName,
    )} has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), componentName))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
