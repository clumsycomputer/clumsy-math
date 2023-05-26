const ChildProcess = require("child_process");
const FileSystem = require("fs");

ChildProcess.execSync(`./node_modules/.bin/tsup-node`);
ChildProcess.execSync(
  "cp ./README.md ./clumsy-math && cp ./LICENSE ./clumsy-math"
);
const basePackageJson = JSON.parse(
  FileSystem.readFileSync("./package.json", "utf-8")
);
const {
  main,
  scripts,
  dependencies,
  devDependencies,
  ...unadjustedPackageJsonFields
} = basePackageJson;
FileSystem.writeFileSync(
  "./clumsy-math/package.json",
  JSON.stringify(
    {
      ...unadjustedPackageJsonFields,
      main: "./index.js",
      types: "./index.d.ts",
    },
    null,
    2
  )
);
