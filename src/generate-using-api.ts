import { fileExists } from "@mongez/fs";
import { Command } from "commander";

export const generateUsingNodeApi = new Command("api").action(async () => {
  const filePath = process.cwd() + "/gnz.ts";

  if (!fileExists(filePath)) return;

  // now we need to import this file
  await import(filePath);
});
