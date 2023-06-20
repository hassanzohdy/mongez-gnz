export type ReactMongezOptions = {
  /**
   * Module name
   */
  name: string;
  /**
   * App name
   *
   * @default: baseName of the saveTo path
   */
  appName?: string;
  /**
   * Save path
   */
  saveTo: string;
  /**
   * Whether to generate a single details page
   *
   * @default true
   */
  withDetailsPage?: boolean;
  /**
   * Add the module to the app-modules.json
   * Works only if the save to path has the modules.json file
   *
   * @default true
   */
  addToAppModules?: boolean;
  /**
   * Separate components directory from pages directory
   * If true, components directory will be created empty
   *
   * @default true
   */
  usingPages?: boolean;
  /**
   * Update urls.ts file
   * Works only if the save to path has the utils/urls.ts file
   */
  updateUrls?: boolean;
};
