import { createGenerator, registerGenerator } from "../../../generators-list";
import { newWarlockHandlerCommand } from "./cli/commands/new-warlock-handler-command";
import { generate } from "./generator";
import { WarlockHandlerOptions } from "./types";

export const generateWarlockHandler = createGenerator<WarlockHandlerOptions>({
  name: "generate-warlock-handler",
  label: "Generate Warlock Handler",
  cliOptions: {
    commands: [newWarlockHandlerCommand],
  },
  defaultOptions: {
    content: `
    // your code here

    return response.success({  
    });
    `,
    imports: [],
  },
  generate,
});

registerGenerator(generateWarlockHandler);
