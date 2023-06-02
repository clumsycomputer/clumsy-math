import { ApiModel } from "@microsoft/api-extractor-model";
import { fetchDocumentationMap } from "./fetchDocumentationMap";
import { generateIntermediateFiles } from "./generateIntermediateFiles";

export interface GenerateReadmeApi {
  temporaryOutputDirectoryPath: string;
}

generateReadme({
  temporaryOutputDirectoryPath: "./temp_declarations",
});

function generateReadme(api: GenerateReadmeApi) {
  const { temporaryOutputDirectoryPath } = api;
  generateIntermediateFiles({
    temporaryOutputDirectoryPath,
  });
  const { documentationMap } = fetchDocumentationMap({
    packageItem: new ApiModel().loadPackage(
      `${temporaryOutputDirectoryPath}/clumsy-math.api.json`
    ),
  });
  console.log(documentationMap);
  //   FileSystem.writeFileSync(
  //     "./README.md",
  //     getReadmeMarkdown({
  //       documentationMap,
  //     }),
  //     {
  //       encoding: "utf-8",
  //     }
  //   );
}
