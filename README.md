# GNZ

Your best solution for generating files and directories.

## Features

- Shipped with many built-in templates.
- Allows you to create your own templates.

## Installation

```bash
npm install @mongez/gnz
```

Using Yarn

```bash
yarn add @mongez/gnz
```

Using pnpm

```bash
pnpm add @mongez/gnz
```

## Usage

There are many built-in templates that you may use.

## Generate React Component

```bash
npx gnz react:component MyComponent --path src/components
```

This will create `MyComponent` component in `src/components` directory with the following structure:

```bash
src
└── components
    └── MyComponent
        ├── index.ts
        └── MyComponent.tsx
```

The output of the `index.ts` file is:

```ts
export { default } from "./MyComponent";
```

The output of the `MyComponent.tsx` file is:

```tsx
import { memo } from "react";
function _MyComponent() {
  return (
    <>
      <h1>MyComponent</h1>
    </>
  );
}

const MyComponent = memo(_MyComponent);
export default MyComponent;
```

By default the component will be `memoized`, if you want to disable this, you can pass `--memo` option with `false` value.

```bash
npx gnz react:component MyComponent --path src/components --memo false
```

If you want to add a forward ref to the component, you can pass `--ref` option.

```bash
npx gnz react:component MyComponent --path src/components --ref
```

The output of the component file will be:

```tsx
import { forwardRef, memo } from "react";
function _MyComponent(props: any, ref: any) {
  return (
    <>
      <h1>MyComponent</h1>
    </>
  );
}

const MyComponent = memo(forwardRef(_MyComponent));
export default MyComponent;
```

## TODO

- [ ] Complete Docs.
