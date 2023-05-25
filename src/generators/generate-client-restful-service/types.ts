export type ClientRestfulServiceGeneratorOptions = {
  /**
   * The path where to save generated files.
   */
  saveTo: string;
  /**
   * Service name.
   * It would be used to generate route path, service class name, service object name, and service file name.
   */
  name: string;
  /**
   * Route path
   */
  route?: string;
  /**
   * Service class name.
   */
  className?: string;
  /**
   * Service object name.
   */
  objectName?: string;
  /**
   * Save service as
   */
  saveAs?: string;
};

export type ClientRestfulServiceGeneratorOptionsStrict =
  Required<ClientRestfulServiceGeneratorOptions>;
