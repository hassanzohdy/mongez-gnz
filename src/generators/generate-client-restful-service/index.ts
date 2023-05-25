// this is the entry file of your generator.
// it is responsible for creating the generator instance.
// DO not add any code here, use generator.ts instead.
// use 'template.ts' to add the code template.
import { createGenerator } from "./../../generators-list";
import { generate } from "./generator";
import { ClientRestfulServiceGeneratorOptions } from "./types";

export const generateGenerateClientRestfulService =
  createGenerator<ClientRestfulServiceGeneratorOptions>({
    // generate name
    name: "generate-client-restful-service",
    // label can get styled text for terminal display.
    label: "Generate Client Restful Service",
    defaultOptions: {
      // default options here
    },
    generate,
  });
