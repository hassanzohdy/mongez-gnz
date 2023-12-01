import { Command } from "commander";
import basePath from "path";
import { gnz } from "../../../../../main";
import { generateQwikPage } from "../../index";

export const newQwikPageCommand = new Command("qwik:page")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the page to")
  .action(async (name, options) => {
    const { path } = options;

    await gnz.execute(
      generateQwikPage.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
      }),
    );
  });
