export type WarlockHandlerOptions = {
  /**
   *  Handler name
   */
  name: string;
  /**
   * Handler description
   */
  description?: string;
  /**
   * Handler file name
   * Do not add extension file
   *
   * @default {name}-handler
   */
  fileName?: string;
  /**
   *  save path
   */
  saveTo: string;
  /**
   * Add more imports
   */
  imports?: string[];
  /**
   * handler content
   */
  content?: string;
  /**
   * Whether to add validation section to handler
   * This will add validation.validate method
   * @default false
   */
  withValidation?: boolean;
  /**
   * validation rules list
   * This will add validation.rules property
   * @default {}
   */
  rules?: {
    [input: string]: string[];
  };
};
