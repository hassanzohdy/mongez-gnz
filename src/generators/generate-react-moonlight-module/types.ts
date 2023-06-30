export type ReactMoonlightOptions = {
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
   * Create details page
   */
  withDetailsPage?: boolean;
  /**
   * Save path
   */
  saveTo: string;
  /**
   * Inputs list
   *
   * Will be used to add the inputs to the form and also to the table columns as well
   */
  inputs?: {
    [key: string]: string;
  };
  /**
   * Super table filters
   */
  filters?: {
    [key: string]: string;
  };
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
