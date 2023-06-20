import chalk from "chalk";
import { registerGenerators } from "./generators-list";
import { ExecutableGenerator, ExecuterOptions, Generator } from "./types";
import { showSpinner } from "./utils";
import { welcome } from "./utils/welcome";

export type GNZOptions = {
  generators?: Generator<any>[];
  execute?: ExecutableGenerator<any>[];
};

export async function gnz(options: () => GNZOptions) {
  //
  welcome();
  const { generators = [] } = options();

  registerGenerators(...generators);
}

gnz.execute = async (
  generator: ExecutableGenerator<any>,
  executeOptions?: ExecuterOptions<any>,
) => {
  const { generate, optionsList } = generator;

  const now = new Date();

  const spinner = showSpinner(
    `Calling ${chalk.cyanBright(
      generator.label || generator.name,
    )} generator...`,
  );

  const output = await generate(optionsList);

  spinner.stop(
    `Generator ${chalk.greenBright(
      generator.label || generator.name,
    )} has been completed successfully (${chalk.gray(
      `${new Date().getTime() - now.getTime()}ms`,
    )})`,
  );

  await executeOptions?.onComplete?.(optionsList, generator);

  return output;
};
