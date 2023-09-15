import { Command } from "commander";
import basePath from "path";
import { generateNextServerReactComponent } from "../..";
import { gnz } from "../../../../main";

export const generateNextjsServerComponentCommand = new Command("next:sc")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the component to")
  .option("-m, --memo <memo>", "Whether to use memo or not")
  .option("-f, --ref <forwardRef>", "Whether to use forwardRef or not")
  .option("-i, --index <withIndex>", "Whether to generate an index file or not")
  .action(async (name, options) => {
    const { memo, ref, index, path } = options;

    await gnz.execute(
      generateNextServerReactComponent.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        forwardRef: ref && ref !== "false",
        memo: memo ? memo !== "false" : false,
        withIndex: index !== "false",
      }),
    );
  });
