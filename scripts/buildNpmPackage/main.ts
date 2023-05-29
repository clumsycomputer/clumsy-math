import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import {
  ApiDocumentedItem,
  ApiItem,
  ApiModel,
} from "@microsoft/api-extractor-model";
import {
  DocBlock,
  DocComment,
  DocFencedCode,
  DocParagraph,
  DocPlainText,
  DocSoftBreak,
} from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import * as ChildProcess from "child_process";
import * as FileSystem from "fs";
import * as Path from "path";
import * as Tsup from "tsup";

buildNpmPackage();

async function buildNpmPackage() {
  await transpileSource();
  simplifyPackageJson();
  copyLicense();
  generateReadmeWithDocumentation();
}

async function transpileSource() {
  return Tsup.build({
    entry: ["library/index.ts"],
    outDir: "clumsy-math",
    splitting: false,
    clean: true,
    minify: true,
    dts: true,
    skipNodeModulesBundle: true,
  });
}

function simplifyPackageJson() {
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
}

function copyLicense() {
  ChildProcess.execSync("cp ./LICENSE ./clumsy-math");
}

function generateReadmeWithDocumentation() {
  ChildProcess.execSync(
    `./node_modules/.bin/tsc --emitDeclarationOnly --declaration --outDir ./temp_declarations`
  );
  Extractor.invoke(
    ExtractorConfig.prepare({
      configObjectFullPath: undefined,
      packageJsonFullPath: Path.resolve("./package.json"),
      configObject: {
        mainEntryPointFilePath: "./temp_declarations/index.d.ts",
        docModel: {
          enabled: true,
          apiJsonFilePath: "./temp_declarations/clumsy-math.api.json",
        },
        compiler: {
          tsconfigFilePath: "./tsconfig.json",
        },
        projectFolder: Path.resolve("./"),
      },
      tsdocConfigFile: TSDocConfigFile.loadFromObject({
        $schema:
          "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
        tagDefinitions: [
          {
            tagName: "@attributes",
            syntaxKind: "block",
            allowMultiple: false,
          },
          {
            tagName: "@relations",
            syntaxKind: "block",
            allowMultiple: true,
          },
        ],
      }),
    })
  );
  const documentationMap: DocumentationMap = {};
  processPackageItem({
    resultDocumentationMap: documentationMap,
    somePackageItem: new ApiModel().loadPackage(
      "./temp_declarations/clumsy-math.api.json"
    ),
  });
  console.log(JSON.stringify(documentationMap, null, 2));
}

interface ProcessPackageItemApi {
  somePackageItem: ApiItem;
  resultDocumentationMap: DocumentationMap;
}

interface DocumentationMap {
  [domainKey: string]: {
    [typeKey: string]: Array<DocumentationItem>;
  };
}

interface DocumentationItem {
  itemName: string;
  itemSummary: string;
  itemDomain: string;
  itemType: string;
  itemExamples: ReturnType<typeof getCommentExamples>;
}

function processPackageItem(api: ProcessPackageItemApi) {
  const { somePackageItem, resultDocumentationMap } = api;
  const itemDocComment =
    somePackageItem instanceof ApiDocumentedItem
      ? somePackageItem.tsdocComment
      : null;
  const lastCustomBlock = itemDocComment?.customBlocks.length
    ? itemDocComment.customBlocks[itemDocComment.customBlocks.length - 1] ??
      throwInvalidPathError("processPackageItem.lastCustomBlock")
    : null;
  if (
    itemDocComment instanceof DocComment &&
    lastCustomBlock instanceof DocBlock &&
    lastCustomBlock.blockTag.tagName === "@attributes"
  ) {
    const itemAttributes = getCommentAttributes({
      someAttributesBlock: lastCustomBlock,
    });
    const documentationItem = {
      itemSummary: getCommentSummary({
        someDocComment: itemDocComment,
      }),
      itemExamples: getCommentExamples({
        someDocComment: itemDocComment,
      }),
      itemRelations: getCommentRelations({
        someDocComment: itemDocComment,
      }),
      itemName: itemAttributes["name"] ?? somePackageItem.displayName,
      itemType:
        itemAttributes["type"] ??
        throwInvalidPathError("processPackageItem.itemType"),
      itemDomain:
        itemAttributes["domain"] ??
        throwInvalidPathError("processPackageItem.itemDomain"),
    };
    const domainMap =
      resultDocumentationMap[documentationItem.itemDomain] ?? {};
    const typeDomainItems = domainMap[documentationItem.itemType] ?? [];
    typeDomainItems.push(documentationItem);
    domainMap[documentationItem.itemType] = typeDomainItems;
    resultDocumentationMap[documentationItem.itemDomain] = domainMap;
  }
  for (const someMemberItem of somePackageItem.members) {
    processPackageItem({
      resultDocumentationMap,
      somePackageItem: someMemberItem,
    });
  }
}

interface GetCommentSummaryApi {
  someDocComment: DocComment;
}

function getCommentSummary(api: GetCommentSummaryApi): string {
  const { someDocComment } = api;
  const summaryParagraph = someDocComment.summarySection.getChildNodes()[0];
  if (summaryParagraph instanceof DocParagraph) {
    let resultSummary = "";
    summaryParagraph.getChildNodes().forEach((someParagraphNode) => {
      if (someParagraphNode instanceof DocPlainText) {
        resultSummary += someParagraphNode.text;
      } else if (someParagraphNode instanceof DocSoftBreak) {
        resultSummary += "\n";
      } else {
        throwInvalidPathError("getCommentSummary.someParagraphNode");
      }
    });
    return resultSummary.trim();
  } else {
    throwInvalidPathError("getCommentSummary.summaryParagraph");
  }
}

interface GetCommentExamplesApi {
  someDocComment: DocComment;
}

function getCommentExamples(api: GetCommentExamplesApi) {
  const { someDocComment } = api;
  return someDocComment.customBlocks
    .filter(
      (someCustomBlock) => someCustomBlock.blockTag.tagName === "@example"
    )
    .map((someExampleBlock) => {
      const exampleSectionNode = someExampleBlock.getChildNodes()[1];
      const exampleTitleNode = exampleSectionNode
        ?.getChildNodes()[0]
        ?.getChildNodes()[2];
      const exampleCodeNode = exampleSectionNode?.getChildNodes()[1];
      return exampleTitleNode instanceof DocPlainText &&
        exampleCodeNode instanceof DocFencedCode
        ? {
            exampleTitle: exampleTitleNode.text,
            exampleLanguage: exampleCodeNode.language,
            exampleCode: exampleCodeNode.code,
          }
        : exampleCodeNode instanceof DocFencedCode
        ? {
            exampleLanguage: exampleCodeNode.language,
            exampleCode: exampleCodeNode.code,
          }
        : throwInvalidPathError("getCommentExamples");
    });
}

interface GetCommentRelationsApi {
  someDocComment: DocComment;
}

function getCommentRelations(api: GetCommentRelationsApi) {
  const { someDocComment } = api;
  return someDocComment.customBlocks
    .filter(
      (someCustomBlock) => someCustomBlock.blockTag.tagName === "@relations"
    )
    .reduce<Record<string, Array<any>>>(
      (resultItemRelations, someRelatedBlock) => {
        const relationsListNode = someRelatedBlock.content
          ?.getChildNodes()[0]
          ?.getChildNodes()[2];
        if (relationsListNode instanceof DocPlainText) {
          const relationsTokens = relationsListNode.text.split(")");
          const relationsType =
            relationsTokens[0]?.slice(1) ??
            throwInvalidPathError("getCommentRelations.relationsType");
          const relationsItems =
            relationsTokens[1]?.split("|").map((someItem) => someItem.trim()) ??
            throwInvalidPathError("getCommentRelations.relationsItems");
          resultItemRelations[relationsType] = relationsItems;
        } else {
          throwInvalidPathError("getCommentRelations");
        }
        return resultItemRelations;
      },
      {}
    );
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
