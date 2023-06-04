import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import * as ChildProcess from "child_process";
import * as Path from "path";
import { GenerateReadmeApi } from "./main";

export interface GenerateIntermediateFilesApi
  extends Pick<GenerateReadmeApi, "temporaryOutputDirectoryPath"> {}

export function generateIntermediateFiles(api: GenerateIntermediateFilesApi) {
  const { temporaryOutputDirectoryPath } = api;
  ChildProcess.execSync(
    `./node_modules/.bin/tsc --emitDeclarationOnly --declaration --outDir ${temporaryOutputDirectoryPath}`
  );
  Extractor.invoke(
    ExtractorConfig.prepare({
      configObjectFullPath: undefined,
      packageJsonFullPath: Path.resolve("./package.json"),
      configObject: {
        mainEntryPointFilePath: `${temporaryOutputDirectoryPath}/index.d.ts`,
        docModel: {
          enabled: true,
          apiJsonFilePath: `${temporaryOutputDirectoryPath}/clumsy-math.api.json`,
        },
        compiler: {
          tsconfigFilePath: "./tsconfig.json",
        },
        projectFolder: Path.resolve("./"),
      },
      tsdocConfigFile: TSDocConfigFile.loadFromObject({
        $schema:
          "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
        tagDefinitions: [],
      }),
    })
  );
}
