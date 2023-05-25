import { format } from "./../../utils";
import { ReactComponentOptions } from "./types";

export async function gnReactComponent(options: ReactComponentOptions) {
  //
  const {
    memo,
    name: componentName,
    forwardRef,
    args = [],
    imports: incomingImports = [],
    renderContent = `    
      <>
        <h1>${componentName}</h1>
      </>
    `,
  } = options;

  const imports: string[] = incomingImports;

  if (forwardRef) {
    imports.push('import React, { forwardRef } from "react";');
  }

  if (memo) {
    imports.push("import React, { memo } from 'react';");
  }

  let content = "";

  if (memo || forwardRef) {
    if (forwardRef && args.length === 0) {
      args.push("props: any", "ref: any");
    }

    // the return of the string should check if the component is memo or forwardRef
    // it could be both as well, so we need to check for both

    let exportStatement = "";

    if (memo && forwardRef) {
      exportStatement = `
        const ${componentName} = memo(forwardRef(_${componentName}));
      export default ${componentName};`;
    } else if (memo) {
      exportStatement = `
        const ${componentName} = memo(_${componentName});
      export default ${componentName};`;
    } else if (forwardRef) {
      exportStatement = `
        const ${componentName} = forwardRef(_${componentName});

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

  const finalContent = importsString ? `${importsString}\n${content}` : content;

  return await format.typescript(finalContent);
}
