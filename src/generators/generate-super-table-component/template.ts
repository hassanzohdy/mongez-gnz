import { rtrim, toCamelCase } from "@mongez/reinforcements";
import Is from "@mongez/supportive-is";
import { format } from "../../utils";
import { SuperTableComponentOptions } from "./types";

const columnsMap = {
  string: "textColumn",
  text: "textColumn",
  email: "emailColumn",
  number: "numberColumn",
  image: "circleImageColumn",
};

function getColumnsImports(columns?: Record<string, string>) {
  if (!columns || Is.empty(columns)) return [];

  return Object.keys(columns)
    .map(name => {
      const [textType] = columns[name].split(".");

      if (!textType) return "";

      return columnsMap[textType] || "";
    })
    .filter(Boolean);
}

// TODO: Add memo feature
export async function generateSuperTableTemplate(
  options: SuperTableComponentOptions,
) {
  //
  const { memo, name: componentName } = options;

  const imports: string[] = [];

  const importsList = [
    "Table",
    "actionsColumn",
    "activeFilter",
    "circleImage",
    "idColumn",
    "localizedColumn",
    "publishedColumn",
    "textFilter",
    ...getColumnsImports(options.columns),
  ];

  if (memo) {
    imports.push('import React from "react";');
  }

  imports.push(
    `import { ${importsList.join(", ")} } from "@mongez/moonlight";`,
  );

  if (options.servicePath && options.serviceName) {
    imports.push(
      `import { ${options.serviceName} } from "${options.servicePath}";`,
    );
  }

  if (options.formComponentName && options.formComponentPath) {
    imports.push(
      `import ${options.formComponentName} from "${options.formComponentPath}";`,
    );
  }

  const parsedColumns = parseColumns(options.columns);

  const importsString = imports.join("\n");

  const parsedFilters = parseFilters(options.filters);

  const content = `
    ${importsString}

    const columns = [${parsedColumns}];

    const filters = [${parsedFilters}];

    export default function ${componentName}() {
      return (        
        <Table
        title="${toCamelCase(String(options.title))}"
        name="${toCamelCase(rtrim(options.name, "Page"))}"
        service={${options.serviceName}}
        ${
          options.formComponentName ? `form={${options.formComponentName}}` : ``
        }
        filters={filters}
        columns={columns}
      />
      )
    } 
    `;

  return await format.typescript(content);
}

export function parseColumns(columns?: Record<string, string>) {
  if (!columns || Is.empty(columns)) return "";

  const parsedColumns = Object.keys(columns)
    .map(name => {
      const [textType, ...options] = columns[name].split(".");

      if (!textType) return "";

      const columnType = columnsMap[textType];

      if (!columnType) return "";

      const optionsString = options.map(method => {
        // check if method has : in it
        // if so, then the value is passed to the method
        // otherwise, it's just a method call
        if (method.includes(":")) {
          const [methodName, value] = method.split(":");

          let columnValue = value;

          if (!["true", "false"].includes(value) && !isNaN(Number(value))) {
            columnValue = `"${value}"`;
          }

          return `${toCamelCase(methodName)}(${columnValue})`;
        }

        return `${toCamelCase(method)}()`;
      });

      const columnName = columnsMap[textType] || "";

      if (!columnName) return "";

      return `${columnName}("${name}")${
        optionsString.length ? `.${optionsString.join(".")}` : ""
      }`;
    })
    .filter(Boolean);

  parsedColumns.unshift("idColumn()");

  return parsedColumns.join(",\n");
}

export function parseFilters(filters: any) {
  if (!filters) return "";

  return `
    activeFilter()
  `;
}
