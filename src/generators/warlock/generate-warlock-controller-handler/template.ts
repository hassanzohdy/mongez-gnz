import { capitalize, toKebabCase } from "@mongez/reinforcements";
import { format } from "../../../utils";
import { WarlockHandlerOptions } from "./types";

export async function gnWarlockHandler(options: WarlockHandlerOptions) {
  const { name, withValidation } = options as Required<WarlockHandlerOptions>;

  const handlerDescription =
    options?.description ?? capitalize(toKebabCase(name).replaceAll("-", " "));

  let validation = "";

  const warlockImports = [
    "type RequestHandler",
    "type Request",
    "type Response",
    "v",
  ];

  if (withValidation) {
    let content = "";

    if (withValidation) {
      content += `validate: async (request: Request, response: Response) => {
        // your code here
        // if any value is returned from this function, the handler won't be executed.
        // as it will interrupt the request and return the value as a response.
      },
      schema: v.object({
        // your schema here
      }), 
      `;
    }

    validation = `${name}.validation = {
      ${content}
    }`;
  }

  const imports = [
    `import { ${warlockImports.join(", ")} } from "@warlock.js/core";`,
    ...(options.imports ?? []),
  ];

  const content = `
    ${imports.join("\n")}

export const ${name}: RequestHandler = async (request: Request, response: Response) => {
  ${options.content}
}

${validation}

${name}.description = "${handlerDescription}";
  `;

  return await format.typescript(content);
}
