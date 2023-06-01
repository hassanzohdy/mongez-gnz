export type MongoDBMigrationOptions = {
  /**
   * Migration name
   */
  name: string;
  /**
   * Migration file name
   *
   * @default name.ts
   */
  fileName?: string;
  /**
   * Save path
   */
  saveTo: string;
  /**
   * Model Class name
   */
  modelClass: string;
  /**
   * Model file path
   */
  modelPath?: string;
  /**
   * Unique index columns
   */
  unique?: string[];
  /**
   * Add id to unique indexes
   *
   * @default true
   */
  uniqueId?: boolean;
  /**
   * Index columns
   */
  index?: string[];
  /**
   * Text index columns
   */
  text?: string[];
  /**
   * Geo index columns
   */
  geo?: string[];
};

export type MigrationTemplateOptions = {
  /**
   * Model Class name
   */
  modelClass: string;
  /**
   * Model file name
   */
  modelFileName: string;
  /**
   * Blue print class name
   */
  bluePrintClassName: string;
  /**
   * Migration function name
   */
  migrationFunctionName: string;
  /**
   * indexes list
   */
  indexes: string[];
  /**
   * Indexes list on down
   */
  indexesDown: string[];
};

export type UtilizeMigrationOptions = Required<
  Pick<
    MongoDBMigrationOptions,
    | "geo"
    | "index"
    | "modelClass"
    | "modelPath"
    | "text"
    | "unique"
    | "uniqueId"
  >
>;
