import { GenericObject } from "@mongez/reinforcements";
import { Command, Option } from "commander";

export interface GeneratorCLIIOptionQuestion {
  /**
   * Question type
   */
  type: "input" | "confirm" | "list" | "checkbox";
  /**
   * Question name
   * This is used to store the answer in the answers object
   */
  name: string;
  /**
   * Question default value
   */
  defaultValue?: string | boolean | string[];
  /**
   * Question choices
   */
  choices?: string[] | { label: string; value: string }[];
  /**
   * Question validate function
   */
  validate?: (input: string) => boolean | string;
  /**
   * What to display next based on the answer
   */
  next?: (
    answer: string | boolean,
    configurations: GenericObject,
  ) => GeneratorCLIIOptionQuestion;
}

export type GeneratorCLIIOptionQuestionInput = Omit<
  GeneratorCLIIOptionQuestion,
  "type" | "choices"
>;

export type GeneratorCLIIOptionQuestionConfirm = Omit<
  GeneratorCLIIOptionQuestion,
  "type" | "choices"
>;

export type GeneratorCLIIOptionQuestionList = Omit<
  GeneratorCLIIOptionQuestion,
  "type" | "message"
> &
  Pick<GeneratorCLIIOptionQuestion, "choices">;

/**
 * Generator CLI
 */
export interface GeneratorCLICommand {
  /**
   * CLI command name, will be used when running the command npx gnz <command-name>
   */
  name: string;
  /**
   * Cli command label, will be used when displaying command in list, you can color it or add any style you want
   */
  label?: string;
  /**
   * Command description
   */
  description?: string;
  /**
   * Option Prompts
   */
  questions?: GeneratorCLIIOptionQuestion[];
  /**
   * Command action
   * Each key is the option name, the value is the option value selected/entered by the user
   */
  action: (options?: GenericObject) => Promise<void>;
  /**
   * Command options
   */
  options?:
    | Option[]
    | {
        [key: string]: {
          /**
           * Option description
           */
          description?: string;
          /**
           * Option default value
           */
          defaultValue?: string | boolean | string[];
          /**
           * Option is required
           */
          required?: boolean;
          /**
           * Option choices
           */
          choices?: string[];
        };
      }[];
}

export interface VSCodeGeneratorContextMenuCommand {
  /**
   * Command name
   */
  name: string;
}

export interface VSCodeGeneratorCommand {
  /**
   * Command name
   */
  name: string;
}

export interface GeneratorVSCodeExtensionOptions {
  /**
   * Context Menu commands
   */
  contextMenu?: VSCodeGeneratorContextMenuCommand[];
  /**
   * Commands List that will be shown in the command palette
   */
  commands?: VSCodeGeneratorCommand[];
}

export type Executer<Options extends GenericObject> =
  () => Generator<Options>["generate"];

export type ExecuterOptions<Options extends GenericObject> = {
  onComplete?: (
    optionsList: Options,
    generator: GeneratorOptions<Options>,
  ) => Promise<void>;
};

export interface Generator<T extends GenericObject = GenericObject>
  extends GeneratorOptions<T> {
  /**
   * Execute the generator
   */
  execute: (
    generatorOptions: T,
    executerOptions?: ExecuterOptions<T>,
  ) => ExecutableGenerator<T>;
}

export interface ExecutableGenerator<T extends GenericObject = GenericObject>
  extends Omit<Generator<T>, "execute"> {
  /**
   * Options list
   */
  optionsList: T;
}

export interface GeneratorOptions<T extends GenericObject = GenericObject> {
  /**
   * Generator name
   */
  name: string;
  /**
   * Generator label
   */
  label?: string;
  /**
   * Generator description
   */
  description?: string;
  /**
   * Generator default options
   */
  defaultOptions?: Partial<T>;
  /**
   * Vscode extension options
   */
  vscodeExtensionOptions?: GeneratorVSCodeExtensionOptions;
  /**
   * Generator CLI Options
   */
  cliOptions?: {
    commands: Command[];
  };
  /**
   * Generate function
   */
  generate: (options: T) => Promise<any>;
  /**
   * Called once the generator is executed
   */
  onComplete?: (options: T) => Promise<any>;
}
