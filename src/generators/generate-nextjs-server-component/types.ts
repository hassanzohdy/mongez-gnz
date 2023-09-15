export type NextServerComponentOptions = {
  /**
   * Component name
   */
  name: string;
  /**
   * Component save path
   */
  saveTo: string;
  /**
   * Add more imports
   */
  imports?: string[];
  /**
   * Create component with props and props type
   *
   * @default true
   */
  withProps?: boolean;
  /**
   * Define components arguments list
   * Please note if this is defined, you've to add the ref argument manually
   */
  args?: string[];
  /**
   * Define what should be added in component body before the return statement
   */
  beforeRenderContent?: string;
  /**
   * Set the render content the return of the component
   */
  renderContent?: string;
  /**
   * Whether to generate a memo component
   * It could be mixed with forwardRef option
   */
  memo?: boolean;
  /**
   * Whether to generate the component in a directory with an index file
   */
  withIndex?: boolean;
  /**
   * Whether to generate a forward ref component
   * It could be mixed with memo option
   */
  forwardRef?: boolean;
};
