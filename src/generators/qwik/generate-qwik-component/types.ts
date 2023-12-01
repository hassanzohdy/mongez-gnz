export type QwikComponentOptions = {
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
   * Define what should be added in component body before the return statement
   */
  beforeRenderContent?: string;
  /**
   * Set the render content the return of the component
   */
  renderContent?: string;
  /**
   * Whether to generate the component in a directory with an index file
   */
  withIndex?: boolean;
  /**
   * Whether to add signal to the component
   *
   * @default false
   */
  withSignal?: boolean;
  /**
   * Whether to add useTask to the component
   *
   * @default false
   */
  withTask?: boolean;
  /**
   * Whether to add visible task to the component
   *
   * @default false
   */
  withVisibleTask?: boolean;
};
