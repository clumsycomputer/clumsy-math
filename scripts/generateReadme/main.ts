import { ApiModel } from "@microsoft/api-extractor-model";
import { fetchDocumentationItems } from "./fetchDocumentationItems";
import { generateIntermediateFiles } from "./generateIntermediateFiles";
import { getReadmeMarkdown } from "./getReadmeMarkdown";
import { writeFileSync } from "fs";

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
  const { documentationItems } = fetchDocumentationItems({
    packageItem: new ApiModel().loadPackage(
      `${temporaryOutputDirectoryPath}/clumsy-math.api.json`
    ),
  });
  writeFileSync(
    "./README.md",
    getReadmeMarkdown({
      documentationItems,
    }),
    {
      encoding: "utf-8",
    }
  );
}
