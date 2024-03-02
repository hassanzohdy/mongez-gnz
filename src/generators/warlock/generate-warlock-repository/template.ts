import { format, toJson } from "../../../utils";
import { WarlockRepositoryOptions } from "./types";

export async function gnWarlockRepository(options: WarlockRepositoryOptions) {
  //
  const {
    className,
    model: modelName,
    modelPath,
    exportName: objectName,
    filters = {},
  } = options as Required<WarlockRepositoryOptions>;

  const imports = [
    `import {
      FilterByOptions,
      RepositoryManager,
      RepositoryOptions,
    } from "@mongez/warlock";`,
    `import { ${modelName} } from "${modelPath}";`,
  ];

  const content = `
    ${imports.join("\n")}
    
    export class ${className} extends RepositoryManager<${modelName}> {
      /**
       * {@inheritDoc}
       */
      public model = ${modelName};
    
      /**
       * Simple columns selections
       * Set the columns that need to be selected when passing 'simple' option with 'true'
       */
      public simpleSelectColumns = ["id"];

      /**
       * List default options
       */
      protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

      /**
       * Filter By options
       */
      protected filterBy: FilterByOptions = this.withDefaultFilters(${toJson(
        filters,
      )});
    }
    
    const ${objectName} = new ${className}();
    
    export default ${objectName};        
  `;

  return await format.typescript(content);
}
