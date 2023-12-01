export type QwikPageOptions = {
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
   * Define what should be added in component body before the return statement
   */
  beforeRenderContent?: string;
  /**
   * Set the render content the return of the component
   */
  renderContent?: string;
  /**
   * With route loader
   *
   * @default true
   */
  withRouteLoader?: boolean;
  /**
   * With head function
   *
   * @default true
   */
  withHead?: boolean;
};
