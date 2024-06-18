import { toStudlyCase } from "@mongez/reinforcements";
import { formatDate } from "../../utils/format-date";
import { format, newLine } from "./../../utils";
import { MigrationTemplateOptions } from "./types";

export async function generateMigrationTemplate(
  options: MigrationTemplateOptions,
) {
  const {
    modelClass,
    modelFileName,
    migrationFunctionName,
    indexes,
    indexesDown,
  } = options;

  const importPath = `../${modelFileName.replace(/^\.\//, "")}`;

  const content = `
import { migrationOffice, type Blueprint } from "@warlock.js/cascade";
import { ${modelClass} } from "${importPath}";

export default migrationOffice.register({
  name: "${migrationFunctionName}",
  blueprint: ${toStudlyCase(modelClass)}.blueprint(),
  createdAt: "${formatDate()}",
  up: (blueprint: Blueprint) => {
    ${indexes.join(newLine)}
  },
  down: (blueprint: Blueprint) => {
    ${indexesDown.join(newLine)}
  },
});
`;

  return await format.typescript(content);
}
