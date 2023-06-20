export type ReactiveFormComponentOptions = {
  /**
   * Component name
   */
  name: string;
  /**
   * Component save path
   */
  saveTo: string;
  /**
   * Set the render content the return of the component
   */
  renderContent?: string;
  /**
   * Whether to generate it with index file or not
   *
   * @default true
   */
  withIndex?: boolean;
  /**
   * Whether to generate a memo component
   * It could be mixed with forwardRef option
   */
  memo?: boolean;
  /**
   * Single name of the component
   *
   * @default singular of the component name
   */
  singleName?: string;
  /**
   * Service name
   */
  serviceName?: string;
  /**
   * Service Path
   */
  servicePath?: string;
  /**
   * Inputs list
   * Example of input: text.required.autoFocus.hint:myHintKey
   */
  inputs?: {
    [name: string]: string;
  };
};
