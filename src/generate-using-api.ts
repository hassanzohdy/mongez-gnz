import { fileExists } from "@mongez/fs";
import { execSync } from "child_process";
import { Command } from "commander";

export const generateUsingNodeApi = new Command("api").action(async () => {
  const filePath = process.cwd() + "/gnz.ts";

  if (!fileExists(filePath)) return;

  execSync(`npx ts-node ${filePath}`, {
    stdio: "inherit",
  });
});
