import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Tsup from "tsup";

interface BuildNpmPackageApi {
  packageDirectoryPath: string;
}

buildNpmPackage({
  packageDirectoryPath: "./clumsy-math",
});

async function buildNpmPackage(api: BuildNpmPackageApi) {
  const { packageDirectoryPath } = api;
  await transpileSource({
    packageDirectoryPath,
  });
  simplifyPackageJson({
    packageDirectoryPath,
  });
  copyAssets({
    packageDirectoryPath,
  });
}

interface TranspileSourceApi {
  packageDirectoryPath: string;
}

async function transpileSource(api: TranspileSourceApi) {
  const { packageDirectoryPath } = api;
  return Tsup.build({
    entry: ["library/index.ts"],
    outDir: packageDirectoryPath,
    splitting: false,
    clean: true,
    minify: true,
    dts: true,
    skipNodeModulesBundle: true,
  });
}

interface SimplifyPackageJsonApi {
  packageDirectoryPath: string;
}

function simplifyPackageJson(api: SimplifyPackageJsonApi) {
  const { packageDirectoryPath } = api;
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
    `${packageDirectoryPath}/package.json`,
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
}

interface CopyAssetsApi {
  packageDirectoryPath: string;
}

function copyAssets(api: CopyAssetsApi) {
  const { packageDirectoryPath } = api;
  ChildProcess.execSync(`cp ./LICENSE ${packageDirectoryPath}`);
  ChildProcess.execSync(`cp ./README.md ${packageDirectoryPath}`);
}
