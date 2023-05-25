// This file is responsible for generating the code template.
// This file is auto imported by default in generator.ts file.
// If you're going to generate a single file, you can put the code template here directly.
// If the generated template is huge, create a directory called 'template' and create 'index.ts' file inside it,
// then collect all templates and export it from 'index.ts' file,
// Put each template file in a separate file then collected them all here.
// If you're going to generate multiple but small files, you can create functions in this file directly.
import { toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import { plural, singular } from "pluralize";
import { prettifyTypescript } from "./../../utils";
import { ClientServiceFileGeneratorOptions } from "./types";

export async function getTemplateContents({
  endpointPath = "shared/endpoint",
  name,
  route,
}: ClientServiceFileGeneratorOptions) {
  const nameInPlural = toStudlyCase(plural(name));
  const nameSingle = toStudlyCase(singular(name));
  const routePath = route || `/${toKebabCase(name)}`;
  const contents = `
  import endpoint from "${endpointPath}";

  /**
   * Get ${nameInPlural} list
   */ 
  export function get${nameInPlural}List(params: any = {}) {
    return endpoint.get("${routePath}", {
      params,
    });
  }

  /**
   * Get ${name} details
   */
  export function get${nameSingle}(id: string | number) {
    return endpoint.get("${routePath}/" + id);
  } 
  `;

  // prettify the content
  return await prettifyTypescript(contents);
}
