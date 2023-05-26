const ChildProcess = require("child_process");
const FileSystem = require("fs");

ChildProcess.execSync("rm -rf ./clumsy-math && mkdir ./clumsy-math");
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
  JSON.stringify(unadjustedPackageJsonFields, null, 2)
);
ChildProcess.execSync(
  `./node_modules/.bin/esbuild ./library --bundle --minify --outfile=./clumsy-math/index.js`
);
