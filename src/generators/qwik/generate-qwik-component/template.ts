import { format } from "./../../../utils";
import { QwikComponentOptions } from "./types";

export async function gnQwikComponent(options: QwikComponentOptions) {
  //
  const {
    name: componentName,
    withProps = false,
    withSignal = false,
    withTask = false,
    withVisibleTask = false,
    imports: incomingImports = [],
    renderContent = `    
      <>
        <h1>${componentName}</h1>
      </>
    `,
  } = options;

  const props = `${componentName}Props`;

  const propsDefinition = withProps
    ? `
    export type ${props} = {
      // props go here
    };    
  `
    : "";

  const imports: string[] = incomingImports;

  const qwikImports = ["component$"];

  let beforeContent = "";

  if (options.beforeRenderContent) {
    beforeContent = options.beforeRenderContent;
  }

  if (withSignal) {
    beforeContent += `
      const ${componentName}Sig = useSignal();
    `;

    qwikImports.push("useSignal");
  }

  if (withTask) {
    beforeContent += `
    useTask$(({ track }) => {
      // your logic goes here
    });
    `;

    qwikImports.push("useTask$");
  }

  if (withVisibleTask) {
    beforeContent += `
    useVisibleTask$(({ track }) => {
      // your logic goes here
    });
    `;

    qwikImports.push("useVisibleTask$");
  }

  imports.unshift(
    `import { ${qwikImports.join(", ")} } from '@builder.io/qwik';`,
  );

  const content = `export const ${componentName} = component$${
    withProps ? `<${props}>` : ""
  }((props) => {
    ${beforeContent}
    return (
      ${renderContent}
    )
  });
    `;

  const importsString = imports.join("\n");

  const finalContent = `${importsString}\n${propsDefinition}${content}`;

  return await format.typescript(finalContent);
}
