export type WarlockRepositoryOptions = {
  /**
   *  Repository name
   */
  name: string;
  /**
   * Repository file name
   * Do not add extension file
   *
   * @default {name}-repository
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
   * @default Repository{Studly(name)}
   */
  className?: string;
  /**
   * Export repository object name
   *
   * @default repository{Studly(name)}
   */
  exportName?: string;
  /**
   * Repository filters list
   */
  filters?: {
    [input: string]: string[];
  };
};
