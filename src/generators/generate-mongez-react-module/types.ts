import { ReactComponentOptions } from "../generate-react-component/types";

export type MongezReactModuleGeneratorOptions = ReactComponentOptions & {
  /**
   * The path where to save generated files.
   */
  saveTo: string;
  /**
   * Module name
   */
  name: string;
  /**
   * use URLs object that is located in `apps/${appName}/utils/urls.ts` file
   * This is the recommended way to add routes so it become more dynamic.
   * @default true
   */
  useUrls?: boolean;
  /**
   * Generate details page
   *
   * @default true
   */
  withDetailsPage?: boolean;
  /**
   * Whether to user guardedRoutes or publicRoutes from `apps/${appName}/utils/router` file
   */
  guarded?: boolean;
  /**
   * Make lazy loaded component
   *
   * @default false
   */
  lazy?: boolean;
  /**
   * Page component name
   *
   * @default ${Name}Page
   */
  pageComponentName?: string;
  /**
   * Details component name
   *
   * @default ${Name}DetailsPage
   */
  detailsPageComponentName?: string;
  /**
   * Use preload feature to load the data before rendering the page component
   *
   * @default false
   */
  // preload?: boolean;
  /**
   * App name
   */
  appName: string;
  /**
   * Route path
   */
  routePath?: string;
  /**
   * Service route path
   *
   * @default $routePath
   */
  serviceRoutePath?: string;
};
