export type SuperTableComponentOptions = {
  /**
   * Component name
   */
  name: string;
  /**
   * Page title
   */
  title?: string;
  /**
   * Mark component as page
   * If set to true, the `Page` will be appended at the end of the component name
   * if not, withHelmet will be set to false
   */
  asPage?: boolean;
  /**
   * Form Component name
   *
   * @requires `formComponentPath` option
   */
  formComponentName?: string;
  /**
   * Form Component path
   */
  formComponentPath?: string;
  /**
   * Component save path
   */
  saveTo: string;
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
   * Permission role
   *
   * @default `${name}`
   */
  role?: string;
  /**
   * Service name
   */
  serviceName?: string;
  /**
   * Service Path
   */
  servicePath?: string;
  /**
   * Columns list
   * Example of name: textColumn:userName.sortable
   */
  columns?: {
    [name: string]: string;
  };
  /**
   * Filters list
   *
   * Example of name: textFilter
   */
  filters?: {
    [name: string]: string;
  };
};
