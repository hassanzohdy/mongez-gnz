export type WarlockOutputOptions = {
  /**
   *  Output name
   */
  name: string;
  /**
   * Output file name
   * Do not add extension file
   *
   * @default {name}-output
   */
  fileName?: string;
  /**
   *  save path
   */
  saveTo: string;
  /**
   * Wether to merge output keys with base output
   *
   * @default true
   */
  withBaseOutputDetails?: boolean;
  /**
   * Base output details Path
   *
   * @default "app/utils/output"
   */
  baseOutputDetailsPath?: string;
  /**
   * With base output details function name
   *
   * @default withBaseOutputDetails
   */
  withBaseOutputDetailsFunctionName?: string;
  /**
   * Whether to generate a memo
   * It could be mixed with forwardRef option
   */
  outputKeys?: {
    [outputKey: string]:
      | "string"
      | "number"
      | "boolean"
      | "object"
      | "array"
      | "float"
      | "integer"
      | "int"
      | "double"
      | "date"
      | "birthDate"
      | "url"
      | "any"
      | "mixed"
      | "localized"
      | "uploadsUrl"
      | "publicUrl"
      | "assetsUrl";
  };
  /**
   * Whether to add extend method
   *
   * @default true
   */
  withExtend?: boolean;
};
