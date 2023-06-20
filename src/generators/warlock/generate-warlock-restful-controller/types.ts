export type WarlockRestfulOptions = {
  /**
   *  Restful name
   */
  name: string;
  /**
   * Restful file name
   * Do not add extension file
   *
   * @default {name}-restful
   */
  fileName?: string;
  /**
   *  save path
   */
  saveTo: string;
  /**
   * Model name
   */
  model?: string;
  /**
   * Model path
   */
  modelPath?: string;
  /**
   * Class name
   *
   * @default Restful{Studly(name)}
   */
  className?: string;
  /**
   * Export restful object name
   *
   * @default restful{Studly(name)}
   */
  exportName?: string;
  /**
   * Repository object name
   */
  repository?: string;
  /**
   * Repository path
   */
  repositoryPath?: string;
  /**
   * Validation rules
   */
  rules?: {
    [input: string]: string[];
  };
};
