import { MongoDBMigrationOptions } from "../generate-mongodb-migration/types";

type Casts = {
  [key: string]:
    | "string"
    | "number"
    | "int"
    | "float"
    | "bool"
    | "boolean"
    | "date"
    | "localized";
};

export type MongoDBModelGeneratorOptions = {
  /**
   * Output file path
   */
  saveTo: string;
  /**
   * Model Collection name
   */
  collection: string;
  /**
   * Model file name
   *
   * @default singularize(collection)
   */
  fileName?: string;
  /**
   * Model Class name
   *
   * @default Studly(singularize(collection))
   */
  className?: string;
  /**
   * Wither to generate it in a directory
   * This will create an index as well
   * @default true
   */
  withIndex?: boolean;
  /**
   * Wither to generate a migration file
   */
  withMigration?: boolean;
  /**
   * Output class name
   */
  outputClass?: string;
  /**
   * Output class file path
   */
  outputClassPath?: string;
  /**
   * Default value
   */
  defaultValue?: Casts;
  /**
   * Casts
   */
  columns?: Casts;
  /**
   * Embedded columns
   *
   * @default ['id']
   */
  embedded?: string[];
} & Pick<
  // Works only if withMigration is true
  MongoDBMigrationOptions,
  "geo" | "index" | "unique" | "uniqueId" | "text"
>;
