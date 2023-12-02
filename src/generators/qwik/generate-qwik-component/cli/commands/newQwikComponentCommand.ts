import { Command } from "commander";
import basePath from "path";
import { generateQwikComponent } from "../..";
import { gnz } from "./../../../../../main";

export const newQwikComponentCommand = new Command("qwik:component")
  .arguments("<name>")
  .option("-p, --path <path>", "Path to save the component to")
  .option("-i, --index <withIndex>", "Whether to generate an index file or not")
  .option("-s, --signal <withSignal>", "Whether to generate a signal or not")
  .option("-t, --task <withTask>", "Whether to generate a task or not")
  .option(
    "-v, --visible-task <withVisibleTask>",
    "Whether to generate a visible task or not",
  )
  .option("-p, --props <withProps>", "Whether to generate props or not")
  .action(async (name, options) => {
    const { index, props, signal, task, visibleTask, path } = options;

    await gnz.execute(
      generateQwikComponent.execute({
        name,
        saveTo: basePath.resolve(process.cwd(), path || ""),
        withIndex: index !== "false",
        withSignal: signal && signal !== "false",
        withTask: task && task !== "false",
        withVisibleTask: visibleTask && visibleTask !== "false",
        withProps: props && props !== "false",
      }),
    );
  });
