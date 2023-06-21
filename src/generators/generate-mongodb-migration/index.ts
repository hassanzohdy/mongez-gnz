import { createGenerator, registerGenerator } from "./../../generators-list";
import { mongodbMigrationCommand } from "./cli/commands/mongodb-migration-command";
import { generate } from "./generator";
import { MongoDBMigrationOptions } from "./types";
export * from "./types";

export const generateMongoDBMigration =
  createGenerator<MongoDBMigrationOptions>({
    name: "generate-mongodb-migration",
    label: "Generate MongoDB Migration File",
    cliOptions: {
      commands: [mongodbMigrationCommand],
    },
    defaultOptions: {},
    generate,
  });

registerGenerator(generateMongoDBMigration);
