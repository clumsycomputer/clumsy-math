import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
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
const documentationItems: Array<DocumentationItem> = [];
processPackageItem({
  resultDocumentationItems: documentationItems,
  somePackageItem: new ApiModel().loadPackage(
    "./temp_declarations/clumsy-math.api.json"
  ),
});
console.log(documentationItems);

interface ProcessPackageItemApi {
  somePackageItem: ApiItem;
  resultDocumentationItems: Array<DocumentationItem>;
}

interface DocumentationItem {
  itemName: string;
  itemSummary: string;
  itemDomain: string;
  itemType: string;
}

function processPackageItem(api: ProcessPackageItemApi) {
  const { somePackageItem, resultDocumentationItems } = api;
  if (
    somePackageItem instanceof ApiDocumentedItem &&
    somePackageItem.tsdocComment &&
    somePackageItem.tsdocComment.customBlocks[0] instanceof DocBlock &&
    somePackageItem.tsdocComment.customBlocks[0].blockTag.tagName ===
      "@attributes"
  ) {
    const itemAttributes = getCommentAttributes({
      someAttributesBlock: somePackageItem.tsdocComment.customBlocks[0],
    });
    resultDocumentationItems.push({
      itemSummary: getCommentSummary({
        someDocComment: somePackageItem.tsdocComment,
      }),
      itemName: itemAttributes["name"] ?? somePackageItem.displayName,
      itemType:
        itemAttributes["type"] ??
        throwInvalidPathError("processPackageItem.itemType"),
      itemDomain:
        itemAttributes["domain"] ??
        throwInvalidPathError("processPackageItem.itemDomain"),
    });
  }
  for (const someMemberItem of somePackageItem.members) {
    processPackageItem({
      resultDocumentationItems,
      somePackageItem: someMemberItem,
    });
  }
}

interface GetCommentSummaryApi {
  someDocComment: DocComment;
}

function getCommentSummary(api: GetCommentSummaryApi): string {
  const { someDocComment } = api;
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

interface GetCommentAttributesApi {
  someAttributesBlock: DocBlock;
}
function getCommentAttributes(
  api: GetCommentAttributesApi
): Record<string, string> {
  const { someAttributesBlock } = api;
  const attributesListTextNode = someAttributesBlock.content
    .getChildNodes()[0]
    ?.getChildNodes()[2];
  if (attributesListTextNode instanceof DocPlainText) {
    return attributesListTextNode.text
      .split("|")
      .reduce<Record<string, string>>(
        (resultAttributes, someAttributeString) => {
          const attributeTokens = someAttributeString.split(":");
          const attributeKey = attributeTokens[0]!.trim();
          const attributeValue = attributeTokens[1]!.trim();
          resultAttributes[attributeKey] = attributeValue;
          return resultAttributes;
        },
        {}
      );
  } else {
    throw new Error("invalid path: getCommentAttributes");
  }
}

function throwInvalidPathError(errorPath: string): never {
  throw new Error(`invalid path: ${errorPath}`);
}
