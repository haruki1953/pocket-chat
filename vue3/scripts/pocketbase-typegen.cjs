const { execSync } = require("child_process");
const path = require("path");

const projectVue3Path = path.resolve(__dirname, "..");

const projectRootPath = path.resolve(projectVue3Path, "..");

const projectPocketbasePath = path.resolve(projectRootPath, "pocketbase");
const projectPocketbaseTypegenPath = path.resolve(projectRootPath, "pocketbase-typegen");

// "pb-typegen-json": "pocketbase-typegen --json ../pocketbase/pb_schema.json --out ./src/lib/pocketbase/pocketbase-types.ts"

// ../pocketbase/pb_schema.json
const jsonPocketbasePbSchema = path.resolve(projectPocketbasePath, 'pb_schema.json')

// ./src/lib/pocketbase/pocketbase-types.ts
const outVue3PbTypes = path.resolve(projectVue3Path, './src/lib/pocketbase/pocketbase-types.ts')

// console.log("=== Path Debug Info ===");
// console.log("projectVue3Path:", projectVue3Path);
// console.log("projectRootPath:", projectRootPath);
// console.log("projectPocketbasePath:", projectPocketbasePath);
// console.log("projectPocketbaseTypegenPath:", projectPocketbaseTypegenPath);
// console.log("jsonPocketbasePbSchema:", jsonPocketbasePbSchema);
// console.log("outVue3PbTypes:", outVue3PbTypes);
// console.log("========================");


execSync(
  `pnpm tsx src/index.ts --json ${jsonPocketbasePbSchema} --out ${outVue3PbTypes}`,
  {
    cwd: projectPocketbaseTypegenPath,
    stdio: "inherit"
  }
);
