import { ensureDirectory, putFile } from "@mongez/fs";
import { toCamelCase, toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import path from "path";
import pluralize from "pluralize";
import { generateWarlockHandler } from "../generate-warlock-controller-handler";
import { generateWarlockOutput } from "../generate-warlock-output";
import { generateWarlockRepository } from "../generate-warlock-repository";
import { generateWarlockRestful } from "../generate-warlock-restful-controller";
import { gnz } from "./../../../main";
import { generateMongoDBModel } from "./../../generate-mongodb-model";
import { generateModuleRoutesContent, getLocalesContent } from "./template";
import { WarlockModuleOptions } from "./types";

export const generate = async (options: WarlockModuleOptions) => {
  const now = Date.now();

  options.saveTo = path.resolve(options.saveTo, toKebabCase(options.name));

  const { name, saveTo } = options;

  ensureDirectory(saveTo);

  // generate output
  const outputOptions = await gnz.execute(
    generateWarlockOutput.execute({
      name: pluralize(options.name, 1),
      saveTo: saveTo + "/output",
      outputKeys: options.columns as any,
    }),
  );

  // generate model
  const modelOptions = await gnz.execute(
    generateMongoDBModel.execute({
      collection: pluralize(options.name),
      saveTo: saveTo + "/models",
      outputClass: outputOptions.name,
      outputClassPath: "./../../output/" + outputOptions.fileName,
      columns: options.columns as any,
    }),
  );

  // generate repository
  const repositoryOptions = await gnz.execute(
    generateWarlockRepository.execute({
      name: options.name,
      saveTo: saveTo + "/repositories",
      model: modelOptions.name,
    }),
  );

  // generate restful controller
  await gnz.execute(
    generateWarlockRestful.execute({
      name: options.name,
      saveTo: saveTo + "/controllers",
      model: modelOptions.name,
      repository: repositoryOptions.exportName,
      repositoryPath: "./../repositories/" + repositoryOptions.fileName,
    }),
  );

  // generate the list controller
  await gnz.execute(
    generateWarlockHandler.execute({
      name: `get${toStudlyCase(pluralize(options.name))}-list`,
      saveTo: saveTo + "/controllers",
      imports: [
        `import { ${repositoryOptions.exportName} } from "../repositories/${repositoryOptions.fileName}";`,
      ],
      content: `
        const {documents: ${toCamelCase(
          pluralize(options.name),
        )}, paginationInfo} = await ${
        repositoryOptions.exportName
      }.listActive(request.all());

      return response.success({
        ${toCamelCase(pluralize(options.name))},
        paginationInfo,
      });
      `,
    }),
  );

  // generate the get controller
  await gnz.execute(
    generateWarlockHandler.execute({
      name: `get${toStudlyCase(pluralize(options.name, 1))}`,
      saveTo: saveTo + "/controllers",
      imports: [
        `import { ${repositoryOptions.exportName} } from "../repositories/${repositoryOptions.fileName}";`,
      ],
      content: `
        const ${toCamelCase(pluralize(options.name, 1))} = await ${
        repositoryOptions.exportName
      }.getActive(request.int("id"));

      if (!${toCamelCase(pluralize(options.name, 1))}) {
        return response.notFound();
      }

      return response.success({
        ${toCamelCase(pluralize(options.name, 1))},
      });
      `,
    }),
  );

  if (options.withEvents) {
    ensureDirectory(saveTo + "/events");
  }

  // create a utils directory
  ensureDirectory(saveTo + "/utils");

  // create a flags file
  putFile(path.join(saveTo + "/utils", `flags.ts`), `// flags list`);

  // create a types file
  putFile(path.join(saveTo + "/utils", `types.ts`), `// types list`);

  if (options.withLocales) {
    putFile(
      path.join(saveTo + "/utils/locales.ts"),
      await getLocalesContent(options),
    );
  }

  // routes file
  putFile(
    path.join(saveTo + "/routes.ts"),
    await generateModuleRoutesContent(options),
  );

  console.log(
    ` ${chalk.green(
      name,
    )} module has been generated successfully in ${chalk.cyan(
      path
        .relative(process.cwd(), path.join(path.resolve(saveTo), name))
        .replaceAll("\\", "/"),
    )} ${chalk.gray(`(${Date.now() - now}ms)`)}`,
  );
};
