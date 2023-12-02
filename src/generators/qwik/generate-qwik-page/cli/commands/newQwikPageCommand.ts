import { ltrim } from "@mongez/reinforcements";
import { Command } from "commander";
import basePath from "path";
import { gnz } from "../../../../../main";
import { generateQwikPage } from "../../index";

export const newQwikPageCommand = new Command("qwik:page")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the page to")
  .option("-h, --head", "Include head in the page")
  .option("-rl, --route-loader", "Include route loader in the page")
  .action(async (name, options) => {
    const { path, head, routeLoader } = options;

    await gnz.execute(
      generateQwikPage.execute({
        name,
        withHead: head && head !== "false",
        withRouteLoader: routeLoader && routeLoader !== "false",
        saveTo: basePath.resolve(process.cwd(), ltrim(path, "/") || ""),
      }),
    );
  });
