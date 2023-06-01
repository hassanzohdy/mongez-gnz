import { createGenerator, registerGenerator } from "./../../generators-list";
import { generateMongoDBModelCommand } from "./cli/commands/generate-mongodb-model-command";
import { generate } from "./generator";
import { MongoDBModelGeneratorOptions } from "./types";

export const generateMongoDBModel =
  createGenerator<MongoDBModelGeneratorOptions>({
    name: "generate-mongodb-model",
    label: "Generate MongoDB Model",
    cliOptions: {
      commands: [generateMongoDBModelCommand],
    },
    defaultOptions: {
      withIndex: true,
      withMigration: true,
      embedded: ["id"],
    },
    generate,
  });

registerGenerator(generateMongoDBModel);
