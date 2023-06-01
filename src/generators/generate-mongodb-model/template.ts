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

  const outputImport = outputClass
    ? `import {${outputClass}} from "${outputClassPath}";`
    : "";

  const content = `
    import { Casts, Document, Model } from "@mongez/mongodb";
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

    /**
     * Define list of columns that are allowed to be only filled.
     * This is recommended to only add the white-listed columns.
     */
    public fillable = ${JSON.stringify(Object.keys(columns))}; 
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
    content += `
      export * from './migration';
    `;
  }

  return await format.typescript(content);
}
