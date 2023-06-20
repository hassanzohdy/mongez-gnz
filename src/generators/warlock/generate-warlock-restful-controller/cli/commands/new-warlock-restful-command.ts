import { Command } from "commander";
import basePath from "path";
import { generateWarlockRestful } from "../..";
import { gnz } from "../../../../../main";

export const newWarlockRestfulCommand = new Command("warlock:restful")
  .arguments("<name>")
  .requiredOption(
    "-p, --path <path>",
    "Path to save the file to, relative to the project root",
  )
  .option(
    "-m, --model <model>",
    "Model name, if not provided, it will be generated from the restful name",
  )
  .option(
    "-mp, --modelPath <modelPath>",
    "Model path, if not provided, it will be generated from the restful name",
  )
  .option(
    "-r, --repository <repository>",
    "Repository name, if not provided, it will be generated from the restful name",
  )
  .option(
    "-rp, --repositoryPath <repositoryPath>",
    "Repository path, if not provided, it will be generated from the restful name",
  )
  .option(
    "-c, --className <className>",
    "Class name, if not provided, it will be generated from the restful name",
  )
  .option(
    "-e, --exportName <exportName>",
    "Export name, if not provided, it will be generated from the restful name",
  )
  .option(
    "-r, --rules <rules>",
    "Validation rules, input:rule|rule2|rule3,input2:rule|rule2|rule3",
  )
  .option("-f, --fileName <fileName>", "File name")
  .action(async (name, options) => {
    const {
      path,
      fileName,
      rules,
      className,
      model,
      modelPath,
      repository,
      repositoryPath,
      exportName,
    } = options;

    const rulesList: any = {};

    if (rules) {
      const inputs = rules.split(",");

      inputs.forEach(key => {
        const [inputName, rules] = key.split(":");

        if (!inputName) return;
        if (!rules) return;

        rulesList[inputName] = rules.split("|");
      });
    }

    await gnz.execute(
      generateWarlockRestful.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        fileName,
        rules: rulesList,
        className,
        model,
        modelPath,
        repository,
        repositoryPath,
        exportName,
      }),
    );
  });
