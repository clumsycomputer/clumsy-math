import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
  ApiPackage,
} from "@microsoft/api-extractor-model";
import {
  DocBlock,
  DocComment,
  DocParagraph,
  DocPlainText,
  DocSoftBreak,
} from "@microsoft/tsdoc";
import * as ChildProcess from "child_process";
import * as FileSystem from "fs";

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
// tsdoc stuff
ChildProcess.execSync(`./node_modules/.bin/tsc`);
try {
  ChildProcess.execSync(`./node_modules/.bin/api-extractor run`);
} catch {
  // swallow false error
}
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
    if (
      someExtractorItem.tsdocComment.customBlocks[0] instanceof DocBlock &&
      someExtractorItem.tsdocComment.customBlocks[0].blockTag.tagName ===
        "@labels"
    ) {
      console.log(
        getCommentLabels(someExtractorItem.tsdocComment.customBlocks[0])
      );
    }
  }
  console.log("");
  for (const someMemberItem of someExtractorItem.members) {
    processExtractorItem(someMemberItem);
  }
}

function getCommentSummary(someDocComment: DocComment): string {
  let resultString = "";
  someDocComment.summarySection.getChildNodes().forEach((someSectionNode) => {
    if (someSectionNode instanceof DocParagraph) {
      someSectionNode.getChildNodes().forEach((someParagraphNode) => {
        if (someParagraphNode instanceof DocPlainText) {
          resultString += someParagraphNode.text;
        } else if (someParagraphNode instanceof DocSoftBreak) {
          resultString += "\n";
        } else {
          throw new Error("invalid path: getCommentSummary");
        }
      });
    } else {
      console.log(someSectionNode.kind);
    }
  });
  return resultString.trim();
}

function getCommentLabels(someLabelsBlock: DocBlock): Array<string> {
  const labelsListTextNode = someLabelsBlock.content
    .getChildNodes()[0]
    ?.getChildNodes()[2];
  if (labelsListTextNode instanceof DocPlainText) {
    return labelsListTextNode.text
      .split(",")
      .map((someLabel) => someLabel.trim());
  } else {
    throw new Error("invalid path: getCommentLabels");
  }
}
