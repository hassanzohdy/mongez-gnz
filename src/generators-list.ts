import { GenericObject } from "@mongez/reinforcements";
import { ExecutableGenerator, Generator, GeneratorOptions } from "./types";

export const generators: Generator[] = [];

/**
 * Register the given generators
 */
export function registerGenerators(...generatorsList: Generator<any>[]) {
  generators.push(...generatorsList);
}

/**
 * Register the given generator
 */
export function registerGenerator(generator: Generator<any>) {
  generators.push(generator);
}

/**
 * Get all registered generators
 */
export function getGeneratorsList() {
  return generators;
}

/**
 * Create a generator instance
 */
export function createGenerator<T extends GenericObject>(
  generatorOptions: GeneratorOptions<T>,
) {
  return {
    ...generatorOptions,
    execute: (options: T) => {
      for (const key in options) {
        if (options[key] === undefined) {
          delete options[key];
        }
      }

      const optionsList = { ...generatorOptions.defaultOptions, ...options };

      return {
        ...generatorOptions,
        optionsList: optionsList,
      } as ExecutableGenerator<T>;
    },
  } as Generator<T>;
}
