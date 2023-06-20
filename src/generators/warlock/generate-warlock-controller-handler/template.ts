import Is from "@mongez/supportive-is";
import { format, toJson } from "../../../utils";
import { WarlockHandlerOptions } from "./types";

export async function gnWarlockHandler(options: WarlockHandlerOptions) {
  //
  const {
    name,
    withValidation,
    rules = {},
  } = options as Required<WarlockHandlerOptions>;

  let validation = "";

  if (!Is.empty(rules) || withValidation) {
    let content = "";

    if (withValidation) {
      content += `validate: async (request: Request, response: Response) => {
        // your code here
        // if any value is returned from this function, the handler won't be executed.
        // as it will interrupt the request and return the value as a response.
      },`;
    }

    if (!Is.empty(rules)) {
      content += `rules: ${toJson(rules)},`;
    }

    validation = `${name}.validation = {
      ${content}
    }`;
  }

  const imports = [
    'import { Request, Response } from "@mongez/warlock";',
    ...(options.imports ?? []),
  ];

  const content = `
    ${imports.join("\n")}
    
    
export default async function ${name}(request: Request, response: Response) {
  ${options.content}
}

${validation}
  `;

  return await format.typescript(content);
}
