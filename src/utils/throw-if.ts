export function throwIf(condition: boolean, message: string) {
  if (condition) {
    throw new Error(message);
  }
}
