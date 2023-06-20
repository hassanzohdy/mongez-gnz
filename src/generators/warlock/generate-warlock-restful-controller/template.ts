import { format, toJson } from "./../../../utils";
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
    rules = {},
  } = options as Required<WarlockRestfulOptions>;

  const imports = [
    'import { Restful, RouteResource } from "@mongez/warlock";',
    `import { ${modelName} } from "${modelPath}";`,
    `import ${repositoryName} from "${repositoryPath}";`,
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
      rules: ${toJson(rules)},
    },
  };
}

 const ${objectName} = new ${className}();
 export default ${objectName};
  `;

  return await format.typescript(content);
}
