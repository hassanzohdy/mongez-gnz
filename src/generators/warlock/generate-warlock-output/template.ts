import { format, toJson } from "./../../../utils";
import { WarlockOutputOptions } from "./types";

export async function gnWarlockOutput(options: WarlockOutputOptions) {
  //
  const {
    name,
    withExtend,
    outputKeys,
    baseOutputDetailsPath,
    withBaseOutputDetails,
    withBaseOutputDetailsFunctionName,
  } = options as Required<WarlockOutputOptions>;

  const imports = ['import { FinalOutput, Output } from "@warlock.js/core"'];

  if (withBaseOutputDetails) {
    imports.push(
      `import { ${withBaseOutputDetailsFunctionName} } from "${baseOutputDetailsPath}"`,
    );
  }

  const withExtendContent = withExtend
    ? `
  /**
   * Extend the resource output
   * Called after transforming the resource output
   */
  protected async extend() {
      //
  }`
    : "";

  let output = toJson(outputKeys);

  if (withBaseOutputDetails)
    output = `${withBaseOutputDetailsFunctionName}(${output})`;

  const content = `
    ${imports.join("\n")}

    export class ${name} extends Output {
      /**
       * {@inheritdoc}
       */
      protected output: FinalOutput = ${output};

      ${withExtendContent}
    }
  `;

  return await format.typescript(content);
}
