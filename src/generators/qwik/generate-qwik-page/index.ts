import { createGenerator, registerGenerator } from "../../../generators-list";
import { newQwikPageCommand } from "./cli/commands/newQwikPageCommand";
import { generate } from "./generator";
import { QwikPageOptions } from "./types";
export * from "./types";

export const generateQwikPage = createGenerator<QwikPageOptions>({
  name: "generate-qwik-page",
  label: "Generate Qwik Page",
  cliOptions: {
    commands: [newQwikPageCommand],
  },
  generate,
});

registerGenerator(generateQwikPage);
