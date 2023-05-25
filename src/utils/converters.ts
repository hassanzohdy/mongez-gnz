import { GenericObject } from "@mongez/reinforcements";

/**
 * Converts an object into json string
 */
export function toJson(object: GenericObject): string {
  const entries = Object.entries(object);
  const strEntries = entries.map(([key, value]) => {
    if (typeof value === "function") {
      // If the value is a function, return it's name
      return `${key}: ${value.name}`;
    } else {
      // Otherwise, stringify the value
      return `"${key}": ${JSON.stringify(value)}`;
    }
  });
  return `{ ${strEntries.join(", ")} }`;
}
