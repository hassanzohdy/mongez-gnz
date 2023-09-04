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

## Generate Http Service files (Mongez Http)

By using [Mongez Http](https://github.com/hassanzohdy/mongez-http), you can easily manage your endpoint services files.

There are two types of services: Single Service file, and restful service file.

### Single Service File

This will generate a service file that contains two function, `getXList` where `X` is the name of the service, and `getX` which receives an id and returns the item with this id.

To create a service file run the following command:

```bash
npx gnz http:service users --path src/services
```

This will generate a `users-service.ts` file in `src/services` directory with the following structure:

```ts
import endpoint from "shared/endpoint";

export function getUsersList(params: any = {}) {
  return endpoint.get("/users", { params });
}

export function getUser(id: string | number) {
  return endpoint.get(`/users/${id}`);
}
```

If the endpoint instance is located in another location, path a `endpoint` option with the path to the endpoint instance.

```bash
npx gnz http:service users --path src/services --endpoint shared/endpoint
```

### Restful Service File

This will generate a service file that contains all the restful method with a [Restful Endpoint Class](https://github.com/hassanzohdy/mongez-http#restful-endpoint) to manage `list`, `get`, `create`, `update`, and `delete` methods for a single resource.

To create a service file run the following command:

```bash
npx gnz http:restful users --path src/services
```

This will generate a `users-service.ts` file in `src/services` directory with the following structure:

```ts
import { RestfulEndpoint } from "mongez/http";

class UsersService extends RestfulEndpoint {
  /**
   * The resource route.
   */
  public route = "/users";
}

export const usersService = new UsersService();
```

If you want to manually change the route (which is taken from the service name) you can pass `--route` option.

```bash
npx gnz http:restful users --path src/services --route /users-list
```

## MongoDB Model

You can easily generate A [MongoDB Model](https://github.com/hassanzohdy/mongodb) using the following command:

```bash
npx gnz gn:model users --path src/models
```

This will create a `user` directory with the following structure:

```bash
src
└── models
    └── user
        ├── index.ts
        └── user.ts
        └── migration.ts
```

The output of the `index.ts` file is:

```ts
import { Casts, Document, Model } from "@mongez/monpulse";

export class User extends Model {
  /**
   * Collection name
   */
  public static collection = "users";

  /**
   * Default value for model data
   * Works only when creating new records
   */
  public defaultValue: Document = {};

  /**
   * Cast data types before saving documents into database
   */
  protected casts: Casts = {};

  /**
   * Define what columns should be used when model document is embedded in another document.
   * Make sure to set only the needed columns to reduce the document size.
   * This is useful for better performance when fetching data from database.
   */
  public embedded = ["id"];
}
```

And the migration file:

```ts
import { User } from "./user";

export const UserBluePrint = User.blueprint();

export async function userMigration() {
  await UserBluePrint.unique("id");
}

userMigration.blueprint = UserBluePrint;

userMigration.down = async () => {
  await UserBluePrint.dropUniqueIndex("id");
};
```

## Generate a migration file

If you want to generate a migration file, you can use the following command:

```bash
npx gnz gn:migration users --path src/migrations
```

## Generate Component Using Node Api

To generate it manually with more options, you can import the component generator manually and call it.

Create a file called `gnz.ts` in your root directory and add the following code:

```ts
import { gnz, generateReactComponent } from "@mongez/gnz";
import path from "path";

gnz.execute(
  generateReactComponent({
    saveTo: path.resolve(__dirname, "src/components"),
    name: "MyComponent",
  }),
);
```

Now execute this command:

```bash
npx gnz api
```

## Generate Service File (Mongez)

This will generate a service file using [Mongez Http](https://github.com/hassanzohdy/mongez-http)

## Vscode Extension

Lazy to do all of this? You can use [the vscode extension](https://marketplace.visualstudio.com/items?itemName=hassanzohdy.gnz) to generate files and directories.

## A note about generated templates

Any template that ends with `(Mongez)`, it means the generated files will be using some of Mongez Packages.

## TODO

- [ ] Generate Nextjs Component.
- [ ] Generate Nextjs Page.
- [ ] Generate `types` file.
- [ ] Generate `scss` module file.
- [ ] Generate `css` module file.
- [ ] Generate `styled` file.
- [ ] Generate Mongez React Module
- [ ] Generate Mongez Moonlight Module
  - [ ] Generate Mongez Moonlight Reactive Form
  - [ ] Generate Mongez Moonlight Super Table
  - [ ] Generate Mongez Moonlight Basic Table
- [ ] Generate Mongez Warlock Module
  - [ ] Generate Mongez Warlock Controller/Action
  - [ ] Generate Mongez Warlock Route
  - [ ] Generate Mongez Warlock Output
  - [ ] Generate Mongez Warlock Locale
  - [ ] Generate Mongez Warlock flags
  - [ ] Generate Mongez Warlock events
- [ ] Generate Mongez MongoDB Model
- [ ] Generate Mongez Laravel Module
- [ ] Complete Docs.
