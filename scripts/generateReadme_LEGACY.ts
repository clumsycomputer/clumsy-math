import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import {
  ApiDocumentedItem,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiModel,
} from "@microsoft/api-extractor-model";
import {
  DocBlock,
  DocComment,
  DocFencedCode,
  DocLinkTag,
  DocParagraph,
  DocPlainText,
  DocSoftBreak,
} from "@microsoft/tsdoc";
import { TSDocConfigFile } from "@microsoft/tsdoc-config";
import * as ChildProcess from "child_process";
import * as Path from "path";
import * as FileSystem from "fs";
import { throwInvalidPathError } from "./helpers/throwInvalidPath";
import { Encoding } from "crypto";
import { ApiDeclaredItem } from "@microsoft/api-extractor-model";

interface GenerateReadmeApi {
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
  const documentationMap: DocumentationMap = {};
  processPackageItem({
    resultDocumentationMap: documentationMap,
    somePackageItem: new ApiModel().loadPackage(
      `${temporaryOutputDirectoryPath}/clumsy-math.api.json`
    ),
  });
  FileSystem.writeFileSync(
    "./README.md",
    getReadmeMarkdown({
      documentationMap,
    }),
    {
      encoding: "utf-8",
    }
  );
}

interface GenerateIntermediateFilesApi
  extends Pick<GenerateReadmeApi, "temporaryOutputDirectoryPath"> {}

function generateIntermediateFiles(api: GenerateIntermediateFilesApi) {
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
}

interface ProcessPackageItemApi {
  somePackageItem: ApiItem;
  resultDocumentationMap: DocumentationMap;
}

interface DocumentationMap {
  [itemId: string]: DocumentationItem;
}

interface DocumentationItem {
  itemId: string;
  itemName: string;
  itemSummary: string;
  itemDomain: string;
  itemCategory: string;
  itemExamples: ReturnType<typeof getCommentExamples>;
  itemRelationsMap: Record<string, Array<string>>;
}

function processPackageItem(api: ProcessPackageItemApi) {
  const { somePackageItem, resultDocumentationMap } = api;
  const itemId =
    somePackageItem.canonicalReference.symbol?.componentPath?.component.toString();
  const itemDocComment =
    somePackageItem instanceof ApiDocumentedItem
      ? somePackageItem.tsdocComment
      : null;
  const lastCustomBlock = itemDocComment?.customBlocks.length
    ? itemDocComment.customBlocks[itemDocComment.customBlocks.length - 1] ??
      throwInvalidPathError("processPackageItem.lastCustomBlock")
    : null;
  if (
    itemId &&
    itemDocComment instanceof DocComment &&
    lastCustomBlock instanceof DocBlock &&
    lastCustomBlock.blockTag.tagName === "@attributes"
  ) {
    if (somePackageItem instanceof ApiFunction) {
      console.log(somePackageItem.fileUrlPath);
      console.log(somePackageItem.getScopedNameWithinPackage());
      for (const foo of somePackageItem.parameters) {
        console.log(foo.name);
        console.log(foo.parameterTypeExcerpt.text);
      }
      console.log(somePackageItem.returnTypeExcerpt.text);
      // console.log(
      //   somePackageItem.parameters[0]?.parameterTypeExcerpt.spannedTokens
      // );
      // console.log(
      //   somePackageItem.parameters[0]?.parameterTypeExcerpt.spannedTokens
      // );
    }
    // console.log(somePackageItem.getScopedNameWithinPackage());
    // console.log(somePackageItem)
    const itemAttributes = getCommentAttributes({
      someAttributesBlock: lastCustomBlock,
    });
    const documentationItem = {
      itemId,
      itemSummary: getCommentSummary({
        someDocComment: itemDocComment,
      }),
      itemExamples: getCommentExamples({
        someDocComment: itemDocComment,
      }),
      itemRelationsMap: getCommentRelations({
        someDocComment: itemDocComment,
      }),
      itemName: itemAttributes["name"] ?? somePackageItem.displayName,
      itemCategory:
        itemAttributes["category"] ??
        throwInvalidPathError("processPackageItem.itemCategory"),
      itemDomain:
        itemAttributes["domain"] ??
        throwInvalidPathError("processPackageItem.itemDomain"),
    };
    resultDocumentationMap[documentationItem.itemId] = documentationItem;
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
      } else if (
        someParagraphNode instanceof DocLinkTag &&
        someParagraphNode.codeDestination?.memberReferences[0] &&
        someParagraphNode.codeDestination?.memberReferences[0].memberIdentifier
      ) {
        const linkedItemId =
          someParagraphNode.codeDestination?.memberReferences[0]
            .memberIdentifier.identifier;
        resultSummary += `@${linkedItemId}`;
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
    .reduce<Record<string, Array<string>>>(
      (resultItemRelations, someRelatedBlock) => {
        const relationsBlockContentNodes = someRelatedBlock.content
          ?.getChildNodes()[0]
          ?.getChildNodes();
        if (
          relationsBlockContentNodes &&
          relationsBlockContentNodes[2] instanceof DocPlainText
        ) {
          const relationsCategoryKey = relationsBlockContentNodes[2].text;
          for (const someContentNode of relationsBlockContentNodes.slice(3)) {
            if (someContentNode instanceof DocLinkTag) {
              const relationsLinks =
                resultItemRelations[relationsCategoryKey] ?? [];
              relationsLinks.push(
                someContentNode.codeDestination?.memberReferences[0]
                  ?.memberIdentifier?.identifier!
              );
              resultItemRelations[relationsCategoryKey] = relationsLinks;
            }
          }
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
    throwInvalidPathError("getCommentAttributes");
  }
}

interface GetReadmeMarkdownApi {
  documentationMap: DocumentationMap;
}

function getReadmeMarkdown(api: GetReadmeMarkdownApi) {
  const { documentationMap } = api;
  const markdownItemsMap = Object.values(documentationMap).reduce<{
    [domainKey: string]: {
      [categoryKey: string]: {
        [itemKey: string]: DocumentationItem;
      };
    };
  }>((resultMarkdownItemsMap, someDocumentationItem) => {
    const domainMap =
      resultMarkdownItemsMap[someDocumentationItem.itemDomain] ?? {};
    const categoryMap = domainMap[someDocumentationItem.itemCategory] ?? {};
    categoryMap[someDocumentationItem.itemId] = someDocumentationItem;
    domainMap[someDocumentationItem.itemCategory] = categoryMap;
    resultMarkdownItemsMap[someDocumentationItem.itemDomain] = domainMap;
    return resultMarkdownItemsMap;
  }, {});
  const linkCollisions = Object.values(documentationMap).reduce<
    Record<string, Array<string>>
  >((collisionsResult, someDocumentationItem) => {
    const defaultLinkId = someDocumentationItem.itemName
      .toLowerCase()
      .replace(/\s/g, "-");
    const itemCollisions = collisionsResult[defaultLinkId] ?? [];
    itemCollisions.push(someDocumentationItem.itemId);
    collisionsResult[defaultLinkId] = itemCollisions;
    return collisionsResult;
  }, {});
  const linkIdentifiersMap = Object.entries(
    linkCollisions
  ).reduce<LinkIdentifiersMap>((result, [defaultLinkKey, collisionItemIds]) => {
    if (collisionItemIds.length > 1) {
      collisionItemIds
        .sort((itemIdA, itemIdB) => {
          const itemA = documentationMap[itemIdA]!;
          const itemB = documentationMap[itemIdB]!;
          const itemStringA = `${itemA.itemDomain} ${itemA.itemCategory}`;
          const itemStringB = `${itemB.itemDomain} ${itemB.itemCategory}`;
          return itemStringA.localeCompare(itemStringB);
        })
        .forEach((someCollisionItemId, collisionIndex) => {
          result[someCollisionItemId] =
            collisionIndex === 0
              ? defaultLinkKey
              : `${defaultLinkKey}-${collisionIndex}`;
        });
    } else {
      result[collisionItemIds[0]!] = defaultLinkKey;
    }
    return result;
  }, {});
  let documentationIndexMarkdown = "";
  const domainCategoryMarkdownItems: Array<DomainCategoryMarkdownItem> = [];
  for (const domainEntry of Object.entries(markdownItemsMap)) {
    const [domainKey, domainMap] = domainEntry;
    for (const categoryEntry of Object.entries(domainMap)) {
      const [domainCategoryKey, categoryItems] = categoryEntry;
      const pluralCategoryKey = `${domainCategoryKey}s`;
      const domainCategoryTitle = `${domainKey} _(${pluralCategoryKey})_`;
      documentationIndexMarkdown += `\n- **[${domainCategoryTitle}](#${domainKey}-${pluralCategoryKey})**\n`;
      let domainCategoryMarkdown = `## ${domainCategoryTitle}\n`;
      for (const someCategoryItem of Object.values(categoryItems)) {
        domainCategoryMarkdown += getDocumentationItemMarkdown({
          documentationMap,
          linkIdentifiersMap,
          someDocumentationItem: someCategoryItem,
        });
      }
      domainCategoryMarkdownItems.push({
        domainCategoryTitle,
        domainCategoryMarkdown,
      });
    }
  }
  const domainCategoriesMarkdown = domainCategoryMarkdownItems
    .map(
      (someCategoryMarkdownItem) =>
        someCategoryMarkdownItem.domainCategoryMarkdown
    )
    .join("\n");
  // prettier-ignore
  return (
`# clumsy-math

a math library for the clumsy and curious 🙂

## documentation
${documentationIndexMarkdown}
${domainCategoriesMarkdown}
`);
}

interface LinkIdentifiersMap {
  [itemId: string]: string;
}

interface DomainCategoryMarkdownItem {
  domainCategoryTitle: string;
  domainCategoryMarkdown: string;
}

interface GetDocumentationItemMarkdownApi
  extends Pick<GetReadmeMarkdownApi, "documentationMap"> {
  someDocumentationItem: DocumentationItem;
  linkIdentifiersMap: LinkIdentifiersMap;
}

function getDocumentationItemMarkdown(api: GetDocumentationItemMarkdownApi) {
  const { someDocumentationItem, documentationMap, linkIdentifiersMap } = api;
  // prettier-ignore
  return (
`${getDocumentationHeaderMarkdown({someDocumentationItem})}
${getDocumentationSummaryMarkdown({someDocumentationItem,documentationMap,linkIdentifiersMap})}
${getDocumentationExamplesMarkdown({someDocumentationItem})}
${getDocumentationRelationsMarkdown({someDocumentationItem,documentationMap,linkIdentifiersMap})}`);
}

interface GetDocumentationHeaderMarkdownApi
  extends Pick<GetDocumentationItemMarkdownApi, "someDocumentationItem"> {
  someDocumentationItem: DocumentationItem;
}

function getDocumentationHeaderMarkdown(
  api: GetDocumentationHeaderMarkdownApi
) {
  const { someDocumentationItem } = api;
  return `\n###### ${someDocumentationItem.itemName}\n`;
}

interface GetDocumentationSummaryMarkdownApi
  extends Pick<
    GetDocumentationItemMarkdownApi,
    "someDocumentationItem" | "documentationMap"
  > {
  linkIdentifiersMap: LinkIdentifiersMap;
}

function getDocumentationSummaryMarkdown(
  api: GetDocumentationSummaryMarkdownApi
) {
  const { someDocumentationItem, documentationMap, linkIdentifiersMap } = api;
  let summaryMarkdown = `> ${someDocumentationItem.itemSummary}`;
  for (const [matchedLinkItemText] of summaryMarkdown.matchAll(/@\w+/g)) {
    const matchedDocumentationItem =
      documentationMap[matchedLinkItemText.slice(1)];
    summaryMarkdown = summaryMarkdown.replace(
      matchedLinkItemText,
      `[${matchedDocumentationItem?.itemName}](#${
        linkIdentifiersMap[matchedDocumentationItem?.itemId ?? -1]
      })`
    );
  }
  return summaryMarkdown;
}

interface GetDocumentationExamplesMarkdownApi
  extends Pick<GetDocumentationItemMarkdownApi, "someDocumentationItem"> {}

function getDocumentationExamplesMarkdown(
  api: GetDocumentationExamplesMarkdownApi
) {
  const { someDocumentationItem } = api;
  return someDocumentationItem.itemExamples.reduce(
    (resultString, someItemExample) => {
      resultString += `\`\`\`${someItemExample.exampleLanguage}\n${someItemExample.exampleCode}\`\`\``;
      return resultString;
    },
    ""
  );
}

interface GetDocumentationRelationsMarkdownApi
  extends Pick<
    GetDocumentationItemMarkdownApi,
    "someDocumentationItem" | "documentationMap"
  > {
  linkIdentifiersMap: LinkIdentifiersMap;
}

function getDocumentationRelationsMarkdown(
  api: GetDocumentationRelationsMarkdownApi
) {
  const { someDocumentationItem, linkIdentifiersMap, documentationMap } = api;
  return Object.entries(someDocumentationItem.itemRelationsMap).reduce(
    (relationResult, [relationKey, relationItems]) => {
      relationResult += `\n<sup><i>${relationItems
        .map(
          (someRelationItemId) =>
            `&emsp;[${documentationMap[someRelationItemId]?.itemName}](#${linkIdentifiersMap[someRelationItemId]})`
        )
        .join(",")}</i></sup>\n`;
      return relationResult;
    },
    ""
  );
}
