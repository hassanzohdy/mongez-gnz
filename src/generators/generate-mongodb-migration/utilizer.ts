import { toCamelCase, toKebabCase } from "@mongez/reinforcements";
import { newLine } from "./../../utils";
import { UtilizeMigrationOptions } from "./types";

export function utilizeMigration({
  modelClass,
  unique,
  index,
  text,
  geo,
  modelPath,
  uniqueId,
}: UtilizeMigrationOptions) {
  if (uniqueId) {
    if (!unique) {
      unique = ["id"];
    } else if (unique.includes("id") === false) {
      unique.unshift("id");
    }
  }

  const bluePrintClassName = `${modelClass}BluePrint`;

  const migrationFunctionName = `${toCamelCase(modelClass)}Migration`;

  // now generate the text for indexes
  // unique indexes first
  // we need to generate it for migration and for migration down
  const uniqueIndexes = unique
    .map(column => {
      return `${bluePrintClassName}.unique("${column}");`;
    })
    .join(newLine);

  const uniqueIndexesDown = unique
    .map(column => {
      return `${bluePrintClassName}.dropUniqueIndex("${column}");`;
    })
    .join(newLine);

  // text indexes
  const textIndexes = text
    .map(column => {
      return `${bluePrintClassName}.textIndex("${column}");`;
    })
    .join(newLine);

  const textIndexesDown = text
    .map(column => {
      return `${bluePrintClassName}.dropTextIndex("${column}");`;
    })
    .join(newLine);

  // normal indexes
  const normalIndexes = index
    .map(column => {
      return `${bluePrintClassName}.index("${column}");`;
    })
    .join(newLine);

  const normalIndexesDown = index
    .map(column => {
      return `${bluePrintClassName}.dropIndex("${column}");`;
    })
    .join(newLine);

  // geo indexes
  const geoIndexes = geo
    .map(column => {
      return `${bluePrintClassName}.geoIndex("${column}");`;
    })
    .join(newLine);

  const geoIndexesDown = geo
    .map(column => {
      return `${bluePrintClassName}.dropGeoIndex("${column}");`;
    })
    .join(newLine);

  // now we need to get only the arrays that are not empty
  const indexes = [
    uniqueIndexes,
    textIndexes,
    normalIndexes,
    geoIndexes,
  ].filter(indexes => indexes.length > 0);

  const indexesDown = [
    uniqueIndexesDown,
    textIndexesDown,
    normalIndexesDown,
    geoIndexesDown,
  ].filter(indexes => indexes.length > 0);

  const modelFileName = modelPath || toKebabCase(modelClass);

  return {
    modelFileName,
    bluePrintClassName,
    migrationFunctionName,
    indexes,
    indexesDown,
  };
}
