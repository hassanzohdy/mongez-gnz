// Require ts-node
const path = require("path");
const tsNode = require("ts-node");

// Register ts-node compiler and specify the tsconfig.json path
tsNode.register({
  project: process.cwd() + "/tsconfig.json",
});
// Get the root directory of the consuming project
const rootDir = process.cwd();

// Construct the file path to 'gnz.ts' in the root directory
const filePath = path.join(rootDir, "file.ts");

// Load and execute the TypeScript file
require(filePath);
