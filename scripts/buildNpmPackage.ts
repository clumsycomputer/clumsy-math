import {
  DocComment,
  DocParagraph,
  DocPlainText,
  DocSoftBreak,
  TSDocParser,
  TSDocTagDefinition,
  TSDocTagSyntaxKind,
} from "@microsoft/tsdoc";
import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import { ApiItem, ApiModel, ApiPackage } from "@microsoft/api-extractor-model";
import { ApiDocumentedItem } from "@microsoft/api-extractor-model";

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

ChildProcess.execSync(`./node_modules/.bin/tsc`);
try {
  ChildProcess.execSync(`./node_modules/.bin/api-extractor run`);
} catch {
  // swallow false error
}
// manually configure parser configuration to match tsdoc.json
const tsdocParser = new TSDocParser();
tsdocParser.configuration.clear(true);
tsdocParser.configuration.addTagDefinition(
  new TSDocTagDefinition({
    tagName: "@concept",
    syntaxKind: TSDocTagSyntaxKind.ModifierTag,
  })
);
//

const apiModel: ApiModel = new ApiModel();
const apiPackage: ApiPackage = apiModel.loadPackage(
  "./temp_declarations/clumsy-math.api.json"
);
processExtractorItem(apiPackage);

function processExtractorItem(someExtractorItem: ApiItem) {
  console.log(someExtractorItem.constructor.name);
  console.log(someExtractorItem.containerKey);
  console.log(someExtractorItem.displayName);
  if (
    someExtractorItem instanceof ApiDocumentedItem &&
    someExtractorItem.tsdocComment
  ) {
    console.log(getCommentSummary(someExtractorItem.tsdocComment));
  }
  console.log("");
  for (const someMemberItem of someExtractorItem.members) {
    processExtractorItem(someMemberItem);
  }
}

function getCommentSummary(someDocComment: DocComment) {
  let resultString = "";
  someDocComment.summarySection.getChildNodes().forEach((someSectionNode) => {
    if (someSectionNode instanceof DocParagraph) {
      someSectionNode.getChildNodes().forEach((someParagraphNode) => {
        if (someParagraphNode instanceof DocPlainText) {
          resultString += someParagraphNode.text;
        } else if (someParagraphNode instanceof DocSoftBreak) {
          resultString += "\n";
        } else {
          throw new Error("invalid path: getSummarySectionString");
        }
      });
    } else {
      console.log(someSectionNode.kind);
    }
  });
  return resultString.trim();
}
