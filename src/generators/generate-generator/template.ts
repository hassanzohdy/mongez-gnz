/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fileExists, putFile } from "@mongez/fs";
import { toStudlyCase } from "@mongez/reinforcements";
import chalk from "chalk";
import { prettifyTypescript, throwIf } from "../../utils";
import { GenerateGeneratorOptions } from "./types";

// generate types.ts
export const generateTypesFile = async ({
  camelCaseName,
  saveTo,
}: GenerateGeneratorOptions) => {
  if (fileExists(saveTo + "/types.ts")) {
    throw new Error(
      `File ${chalk.yellow("types.ts")} already exists in ${chalk.redBright(
        saveTo,
      )}.`,
    );
  }
  const contents = await prettifyTypescript(`export type ${toStudlyCase(
    camelCaseName as string,
  )}Options = {
    /**
     * The path where to save generated files.
     */ 
    saveTo: string;
  };
  `);

  putFile(saveTo + "/types.ts", contents);
};

// generate template.ts
export const generateGeneratorTemplateFile = async ({
  camelCaseName,
  saveTo,
}: GenerateGeneratorOptions) => {
  throwIf(
    fileExists(saveTo + "/template.ts"),
    `File ${chalk.yellow("template.ts")} already exists in ${chalk.redBright(
      saveTo,
    )}.`,
  );

  const optionsTypes = `${toStudlyCase(camelCaseName!)}Options`;

  const fileContents = `
  // This file is responsible for generating the code template.
  // This file is auto imported by default in generator.ts file.
  // If you're going to generate a single file, you can put the code template here directly.
  // If the generated template is huge, create a directory called 'template' and create 'index.ts' file inside it,
  // then collect all templates and export it from 'index.ts' file, 
  // Put each template file in a separate file then collected them all here.
  // If you're going to generate multiple but small files, you can create functions in this file directly.
    import { ${optionsTypes} } from "./types";
    import { prettifyTypescript } from "@mongez/gnz";    

    export async function getTemplateContents(
      optionsList: ${optionsTypes},
    ) {
      const contents = \`// Add the content here
  \`;

      // prettify the content
      return await prettifyTypescript(contents);
    }
  `;

  const contents = await prettifyTypescript(fileContents);

  putFile(saveTo + "/template.ts", contents);
};

// generate generator.ts
export const generateGeneratorFile = async ({
  camelCaseName,
  saveTo,
}: GenerateGeneratorOptions) => {
  if (fileExists(saveTo + "/generator.ts")) {
    throw new Error(
      `File ${chalk.yellow("generator.ts")} already exists in ${chalk.redBright(
        saveTo,
      )}.`,
    );
  }

  const optionsTypes = `${toStudlyCase(camelCaseName!)}Options`;

  const fileContents = `
    // This file is responsible for generating the code template.
    // It is called when user calls this generator.
    // Code template should not be added here, use 'template.ts' instead then get the output
    // of the function and put it in the file here, this makes it easier to maintain your generator.
    import { putFile, ensureDirectory } from "@mongez/fs";
    import chalk from "chalk";
    import path from "path";
    import { cwd } from "process";
    import { showSpinner } from "@mongez/gnz";
    import { createGenerator, registerGenerator } from "@mongez/gnz";
    import { getTemplateContents } from "./template";
    import { ${optionsTypes} } from "./types";

export async function generate(optionsList: ${optionsTypes}) {
  // this is just an example, you can remove it.
  const { saveTo } = optionsList;

  // use loader to show a spinner while generating the content
  const loader = showSpinner(\`Generating \${chalk.yellow(
    "index.ts",
  )} file...\`);

  // make sure the directory exists
  ensureDirectory(saveTo);

  // generate the content
  const contents = await getTemplateContents(optionsList);

  // stop the loader
  loader.stop(\`Generated \${chalk.green("index.ts")} file successfully.\`);
  
  // save the content to the file
  putFile(saveTo + "/index.ts", contents);      
}
  `;

  const contents = await prettifyTypescript(fileContents);

  putFile(saveTo + "/generator.ts", contents);
};

// generate index.ts
export const generateIndexFile = async ({
  saveTo,
  name,
  camelCaseName,
}: GenerateGeneratorOptions) => {
  if (fileExists(saveTo + "/index.ts")) {
    throw new Error(
      `File ${chalk.yellow("index.ts")} already exists in ${chalk.redBright(
        saveTo,
      )}.`,
    );
  }

  const optionsTypes = `${toStudlyCase(camelCaseName!)}Options`;

  // remove from label generate-
  // then replace all - with space
  const label = name.replace("generate-", "").replace(/-/g, " ");

  const contents = `
  // this is the entry file of your generator.
  // it is responsible for creating the generator instance.
  // DO not add any code here, use generator.ts instead.
  // use 'template.ts' to add the code template.  
  import { createGenerator } from "@mongez/gnz";
  import { generate } from "./generator";
  import { ${optionsTypes} } from "./types";

  export const generate${toStudlyCase(
    name,
  )} = createGenerator<${optionsTypes}>({
    // generate name
    name: "${name}",
    // label can get styled text for terminal display.
    label: "Generate ${label}",
    defaultOptions: {
      // default options here
    },
    generate,
  });`;

  putFile(saveTo + "/index.ts", await prettifyTypescript(contents));
};
