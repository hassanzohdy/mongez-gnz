import { toCamelCase } from "@mongez/reinforcements";
import { isEmpty } from "@mongez/supportive-is";
import { format } from "./../../utils";
import { ReactiveFormComponentOptions } from "./types";

const inputsMap = {
  string: "textInput",
  text: "textInput",
  email: "emailInput",
  textarea: "textareaInput",
  number: "numberInput",
  float: "floatInput",
  double: "floatInput",
  int: "integerInput",
  integer: "integerInput",
  boolean: "switchInput",
  switch: "switchInput",
  date: "dateInput",
  dateTime: "dateTimeInput",
  image: "imageInput",
  images: "dropzoneInput",
  divider: "divider",
  files: "dropzoneInput",
  options: "selectOptions",
  select: "selectRequest",
  multiSelect: "multiSelectInput",
  active: "activeInput",
};

function getInputsList(inputs?: Record<string, string>) {
  if (!inputs || isEmpty(inputs)) return [];

  return Object.keys(inputs)
    .map(name => {
      const [textType] = inputs[name].split(".");

      if (!textType) return "";

      return inputsMap[textType] || "";
    })
    .filter(Boolean);
}

export async function generateReactiveFormTemplate(
  options: ReactiveFormComponentOptions,
) {
  //
  const { memo, name: componentName, inputs } = options;

  const imports: string[] = [];

  const importsList = [
    "createReactForm",
    "activeInput",
    ...getInputsList(inputs),
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

  let parsedInputs = parseInputs(options.inputs);

  if (parsedInputs) {
    parsedInputs = `${parsedInputs}, activeInput()`;
  } else {
    parsedInputs = "activeInput()";
  }

  const importsString = imports.join("\n");
  const service = options.serviceName
    ? `const service = ${options.serviceName};`
    : "";

  const content = `
    ${importsString}

    const singleName = "${options.singleName}";
    ${service}

    const inputs = [${parsedInputs}];

const ${componentName} = createReactForm(reactiveForm => {
  reactiveForm
  .singleName(singleName)${parsedInputs ? `.setInputs(inputs)` : ""}${
    options.serviceName ? `.service(service)` : ""
  }  
});

    export default ${
      options.memo ? `React.memo(${componentName})` : componentName
    };
    `;

  return await format.typescript(content);
}

export function parseInputs(inputs?: Record<string, string>) {
  if (!inputs || isEmpty(inputs)) return "";

  const parsedInputs = Object.keys(inputs)
    .map(name => {
      const [textType, ...options] = inputs[name].split(".");

      if (!textType) return "";

      const inputType = inputsMap[textType];

      if (!inputType) return "";

      const optionsString = options.map(method => {
        // check if method has : in it
        // if so, then the value is passed to the method
        // otherwise, it's just a method call
        if (method.includes(":")) {
          const [methodName, value] = method.split(":");

          let inputValue = value;

          if (!["true", "false"].includes(value) && !isNaN(Number(value))) {
            inputValue = `"${value}"`;
          }

          return `${toCamelCase(methodName)}(${inputValue})`;
        }

        return `${toCamelCase(method)}()`;
      });

      const inputName = inputsMap[textType] || "";

      if (!inputName) return "";

      return `${inputName}("${name}")${
        optionsString.length ? `.${optionsString.join(".")}` : ""
      }`;
    })
    .filter(Boolean);

  return parsedInputs.join(",\n");
}
