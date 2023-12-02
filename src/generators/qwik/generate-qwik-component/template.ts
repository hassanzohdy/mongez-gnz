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

  let beforeContent = "";

  if (options.beforeRenderContent) {
    beforeContent = options.beforeRenderContent;
  }

  if (withSignal) {
    beforeContent += `
      const ${componentName}Sig = useSignal();
    `;

    imports.push(`import { useSignal } from '@builder.io/qwik';`);
  }

  if (withTask) {
    beforeContent += `
    useTask$(({ track }) => {
      // your logic goes here
    });
    `;

    imports.push(`import { useTask$ } from '@builder.io/qwik';`);
  }

  if (withVisibleTask) {
    beforeContent += `
    useVisibleTask$(({ track }) => {
      // your logic goes here
    });
    `;

    imports.push(`import { useVisibleTask$ } from '@builder.io/qwik';`);
  }

  imports.unshift("import { component$ } from '@builder.io/qwik';");

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
