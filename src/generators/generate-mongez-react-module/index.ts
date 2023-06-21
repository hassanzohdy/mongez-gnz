// this is the entry file of your generator.
// it is responsible for creating the generator instance.
// DO not add any code here, use generator.ts instead.
// use 'template.ts' to add the code template.
import { createGenerator } from "../../generators-list";
import { generate } from "./generator";
import { MongezReactModuleGeneratorOptions } from "./types";
export * from "./types";

export const generateMongezReactModule =
  createGenerator<MongezReactModuleGeneratorOptions>({
    // generate name
    name: "generate-mongez-react-module",
    // label can get styled text for terminal display.
    label: "Generate Mongez react module",
    defaultOptions: {
      // default options here
      lazy: false,
      guarded: false,
      useUrls: true,
      withDetailsPage: true,
    },
    generate,
  });
