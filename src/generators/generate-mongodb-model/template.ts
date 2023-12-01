import { rtrim } from "@mongez/reinforcements";
import { format, toJson } from "./../../utils";
import { MongoDBModelGeneratorOptions } from "./types";

export async function generateModelContent(
  options: Partial<MongoDBModelGeneratorOptions>,
) {
  //
  const {
    collection,
    className,
    defaultValue = {},
    outputClass,
    outputClassPath,
    columns = {},
    embedded = ["id"],
  } = options;

  if (!columns.isActive) {
    columns.isActive = "boolean";
  }

  const outputImport = outputClass
    ? `import {${outputClass}} from "${outputClassPath}";`
    : "";

  const content = `
    import { Casts, Document, Model, ModelSync } from "@mongez/monpulse";
    ${outputImport}
  
    export class ${className} extends Model {
      /**
       * Collection name
       */
      public static collection = "${collection}";
    
      ${
        outputClass
          ? `
      /**
       * Output class
       */
      public static output = ${outputClass};
      `
          : ""
      }
    
      /**
       * List of models to sync with
       * To sync with a single embedded document use: [User.sync("city")], 
       * this will update the city sub-document to all users when city model is updated.
       * To sync with multiple embedded documents use: [Post.syncMany("keywords")],
       * This will update the keywords sub-document to all posts when keywords model is updated.
       */
      public syncWith: ModelSync[] = [];

      /**
       * Default value for model data
       * Works only when creating new records
       */
      public defaultValue: Document = ${toJson(defaultValue)};
    
      /**
       * Cast data types before saving documents into database
       */ 
      protected casts: Casts = ${toJson(columns)};

      
    /**
     * Define what columns should be used when model document is embedded in another document.
     * Make sure to set only the needed columns to reduce the document size.
     * This is useful for better performance when fetching data from database.
     */
    public embedded = ${JSON.stringify(embedded)};
    }        
    `;

  return await format.typescript(content);
}

export async function generateModelIndexContent(
  options: MongoDBModelGeneratorOptions,
) {
  const { withMigration } = options;

  let content = `
  export * from "./${rtrim(options.fileName as string, ".ts")}";
  `;

  if (withMigration) {
    content += `export * from './migration';
    `;
  }

  return await format.typescript(content);
}
