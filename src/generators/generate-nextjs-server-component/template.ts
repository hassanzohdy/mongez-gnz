import { format } from "../../utils";
import { NextServerComponentOptions } from "./types";

export async function gnReactComponent(options: NextServerComponentOptions) {
  //
  const {
    memo,
    name: componentName,
    forwardRef,
    withProps = true,
    args = [],
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

  if (forwardRef || memo) {
    imports.push('import React from "react";');
  }

  let content = "";

  if (memo || forwardRef) {
    if (forwardRef && args.length === 0) {
      args.push(`props: ${props}`, "ref: any");
    } else {
      args.push(`props: ${props}`);
    }

    // the return of the string should check if the component is memo or forwardRef
    // it could be both as well, so we need to check for both

    let exportStatement = "";

    if (memo && forwardRef) {
      exportStatement = `
        const ${componentName} = React.memo(React.forwardRef(_${componentName}));
      export default ${componentName};`;
    } else if (memo) {
      exportStatement = `
        const ${componentName} = React.memo(_${componentName});
      export default ${componentName};`;
    } else if (forwardRef) {
      exportStatement = `
        const ${componentName} = React.forwardRef(_${componentName});

      export default ${componentName};`;
    }

    content = `function _${componentName}(${args.join(", ")}) {
      ${options.beforeRenderContent || ""}
      return (
        ${renderContent || ``}
      )
      }
      ${exportStatement}
      `;
  } else {
    args.push(withProps ? `props: ${props}` : "");
    content = `export default function ${componentName}(${args.join(", ")}) {
      ${options.beforeRenderContent || ""}
      return (
        <>
          <h1>${componentName}</h1>
        </>
      )
    }
      `;
  }

  const importsString = imports.join("\n");

  const finalContent = `"use server";
${importsString}\n${propsDefinition}${content}`;

  return await format.typescript(finalContent);
}
