import { format, newLine } from "./../../utils";
import { MigrationTemplateOptions } from "./types";

export async function generateMigrationTemplate(
  options: MigrationTemplateOptions,
) {
  //
  const {
    modelClass,
    modelFileName,
    bluePrintClassName,
    migrationFunctionName,
    indexes,
    indexesDown,
  } = options;
  const content = `
  import {type Migration} from "@mongez/monpulse";
  import { ${modelClass} } from "./${modelFileName}";

export const ${bluePrintClassName} = ${modelClass}.blueprint();

export const ${migrationFunctionName}: Migration = async () => {
  ${indexes.join(newLine)}
}

${migrationFunctionName}.blueprint = ${bluePrintClassName};

${migrationFunctionName}.down = async () => {
  ${indexesDown.join(newLine)}
};
`;

  return await format.typescript(content);
}
