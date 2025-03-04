export type WarlockModuleOptions = {
  /**
   *  Module name
   */
  name: string;
  /**
   *  save path
   */
  saveTo: string;
  /**
   * Generate as a sub module
   *
   * @default false
   */
  subModule?: boolean;
  /**
   * If set to true, will create a new folder `events` with `index.ts` file
   *
   * @default true
   */
  withEvents?: boolean;
  /**
   * If set to true, a `utils/locales.ts` file will be created
   *
   * @default true
   */
  withLocales?: boolean;
  /**
   * Columns list
   * Will be used in generating model and output files
   *
   * @default {}
   */
  columns?: {
    [column: string]: string;
  };
};
