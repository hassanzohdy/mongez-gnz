// This file is responsible for generating the code template.
// This file is auto imported by default in generator.ts file.
// If you're going to generate a single file, you can put the code template here directly.
// If the generated template is huge, create a directory called 'template' and create 'index.ts' file inside it,
// then collect all templates and export it from 'index.ts' file,
// Put each template file in a separate file then collected them all here.
// If you're going to generate multiple but small files, you can create functions in this file directly.
import { prettifyTypescript } from "./../../utils";
import { ClientRestfulServiceGeneratorOptionsStrict } from "./types";

export async function getTemplateContents({
  objectName,
  className,
  route,
}: ClientRestfulServiceGeneratorOptionsStrict) {
  const contents = `
  import { RestfulEndpoint } from "@mongez/http";

  class ${className} extends RestfulEndpoint {
    /**
     * {@inheritDoc}
     */
    public route = "${route}";
  }
  
  export const ${objectName} = new ${className}();   
  `;

  // prettify the content
  return await prettifyTypescript(contents);
}
