import { format as prettierFormat } from "prettier";

/**
 * Use prettier to prettify Typescript code
 * Use .prettierrc to configure prettier from cwd
 */
export async function prettifyTypescript(code: string) {
  const format = prettierFormat(code, {
    parser: "typescript",
    semi: true,
    tabWidth: 2,
    printWidth: 80,
    singleQuote: false,
    arrowParens: "avoid",
    trailingComma: "all",
    bracketSameLine: true,
    endOfLine: "auto",
  });

  return format;
}

export const format = {
  typescript: prettifyTypescript,
};
