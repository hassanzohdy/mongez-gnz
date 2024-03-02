import { capitalize, toKebabCase } from "@mongez/reinforcements";
import { isEmpty } from "@mongez/supportive-is";
import { format, toJson } from "../../../utils";
import { WarlockHandlerOptions } from "./types";

export async function gnWarlockHandler(options: WarlockHandlerOptions) {
  const { name, withValidation, rules } =
    options as Required<WarlockHandlerOptions>;

  const handlerDescription =
    options?.description ?? capitalize(toKebabCase(name).replaceAll("-", " "));

  let validation = "";

  const warlockImports = [
    "type RequestHandler",
    "type Request",
    "type Response",
  ];

  if (!isEmpty(rules) || withValidation) {
    let content = "";

    if (withValidation) {
      content += `validate: async (request: Request, response: Response) => {
        // your code here
        // if any value is returned from this function, the handler won't be executed.
        // as it will interrupt the request and return the value as a response.
      },`;
    }

    if (!isEmpty(rules)) {
      content += `rules: new ValidationSchema(${toJson(rules)}),`;
    } else {
      content += `rules: new ValidationSchema({
        // input: [rules]
      }),`;
    }

    warlockImports.push("ValidationSchema");

    validation = `${name}.validation = {
      ${content}
    }`;
  }

  const imports = [
    `import { ${warlockImports.join(", ")} } from "@mongez/warlock";`,
    ...(options.imports ?? []),
  ];

  const content = `
    ${imports.join("\n")}

const ${name}: RequestHandler = async (request: Request, response: Response) => {
  ${options.content}
}

${validation}

${name}.description = "${handlerDescription}";

export default ${name};
  `;

  return await format.typescript(content);
}
