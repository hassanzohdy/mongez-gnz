import { Command } from "commander";
import basePath from "path";
import { generateQwikComponent } from "../..";
import { gnz } from "./../../../../../main";

export const newQwikComponentCommand = new Command("qwik:component")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the component to")
  .option("-i, --index <withIndex>", "Whether to generate an index file or not")
  .action(async (name, options) => {
    const { index, path } = options;

    await gnz.execute(
      generateQwikComponent.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        withIndex: index !== "false",
      }),
    );
  });
