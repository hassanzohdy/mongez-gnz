import { ESLint } from "eslint";
import { format as prettierFormat } from "prettier";

const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest" as const,
    sourceType: "module" as const,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "error",
    "import/no-duplicates": ["error", { considerQueryString: true }],
  } as any,
};

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

export const eslint = {
  formatFile: eslintFormatFile,
};

async function eslintFormatFile(filePath: string) {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({
    fix: true,
    fixTypes: ["layout", "problem", "suggestion"],
    useEslintrc: false,
    overrideConfig: eslintConfig,
  });

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles([filePath]);

  // 3. Modify the files with the fixed code.
  await ESLint.outputFixes(results);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const output = await formatter.format(results);

  return output;
}

async function eslintFormat(code: string) {
  // 1. Create an instance
  const eslint = new ESLint({
    useEslintrc: false,
    fix: true,
    fixTypes: ["layout"],
    overrideConfig: eslintConfig,
  });

  // 2. Lint text.
  const results = await eslint.lintText(code);

  for (const r of results) {
    console.log(r.output);
  }

  return results[0]?.output || code;
}
