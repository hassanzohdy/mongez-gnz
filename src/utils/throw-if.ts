export function throwIf(condition: boolean, message: string) {
  if (condition) {
    console.log(message);
    process.exit(1);
  }
}
