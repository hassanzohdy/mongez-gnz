import { format } from "./../../../utils";
import { WarlockRestfulOptions } from "./types";

export async function gnWarlockRestful(options: WarlockRestfulOptions) {
  //
  const {
    className,
    model: modelName,
    modelPath,
    repository: repositoryName,
    repositoryPath,
    exportName: objectName,
  } = options as Required<WarlockRestfulOptions>;

  const imports = [
    'import { Restful, type RouteResource, v } from "@warlock.js/core";',
    `import { type ${modelName} } from "${modelPath}";`,
    `import { ${repositoryName} } from "${repositoryPath}";`,
  ];

  const content = `
    ${imports.join("\n")}
    
class ${className} extends Restful<${modelName}> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = ${repositoryName};

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {
      schema: v.object({
        // add your validation rules here
      }),
    },
  };
}

 export const ${objectName} = new ${className}();
  `;

  return await format.typescript(content);
}
