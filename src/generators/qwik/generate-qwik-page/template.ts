import { format } from "../../../utils";
import { QwikPageOptions } from "./types";

export async function gnQwikPage(options: QwikPageOptions) {
  //
  const {
    name: componentName,
    imports: incomingImports = [],
    withRouteLoader = true,
    withHead = true,
    renderContent = `    
      <>
        <h1>${componentName}</h1>
      </>
    `,
  } = options;

  const imports: string[] = incomingImports;

  imports.unshift("import { component$ } from '@builder.io/qwik';");
  const importsString = imports.join("\n");

  let routeLoaderContent = "";

  let beforeContent = "";

  if (withRouteLoader) {
    imports.push(`import { routeLoader$ } from '@builder.io/qwik-city';`);

    routeLoaderContent = `
    export const use${componentName} = routeLoader$(async (requestEvent) => {
      // This code runs only on the server, after every navigation
      // your logic goes here
    });    
    `;

    beforeContent = `
      const data = use${componentName}();
    `;
  }

  let headContent = "";

  if (withHead) {
    imports.push(`import type { DocumentHead } from '@builder.io/qwik-city';`);

    const param = withRouteLoader ? "{ resolveValue }" : "";

    headContent = `
    export const head: DocumentHead = (${param}) => {
      ${
        withRouteLoader ? `const data = resolveValue(use${componentName});` : ""
      }

      return {
        title: "${componentName}",
        // other meta data goes here
      };
    };
    `;
  }

  const content = `
    ${importsString}

    ${routeLoaderContent}

    export default component$(() => {
      ${beforeContent}
            
      return (
        ${renderContent}
      );
    });        

    ${headContent}
    `;

  return await format.typescript(content);
}
