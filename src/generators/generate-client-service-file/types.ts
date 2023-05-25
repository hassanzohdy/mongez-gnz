export type ClientServiceFileGeneratorOptions = {
  /**
   * The path where to save generated files.
   */
  saveTo: string;
  /**
   * Service name.
   */
  name: string;
  /**
   * Route path
   */
  route?: string;
  /**
   * Save service file as
   */
  saveAs?: string;
  /**
   * Endpoint path that will be used as endpoint resolver
   *
   * @default shared/endpoint
   */
  endpointPath?: string;
};
