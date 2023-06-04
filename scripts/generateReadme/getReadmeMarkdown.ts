import { readFileSync } from "fs";
import { fetchDocumentationItems } from "./fetchDocumentationItems";
import { DocumentationItem } from "./encodings";
import { throwInvalidPathError } from "../helpers/throwInvalidPath";

export interface GetReadmeMarkdownApi
  extends Pick<
    ReturnType<typeof fetchDocumentationItems>,
    "documentationItems"
  > {}

export function getReadmeMarkdown(api: GetReadmeMarkdownApi): string {
  const { documentationItems } = api;
  const readmeTemplate = readFileSync(`${__dirname}/README.template.md`, {
    encoding: "utf-8",
  });
  return readmeTemplate.replace(
    /{{documentationMarkdown}}/,
    getDocumentationMarkdown({
      documentationItems,
    })
  );
}

interface GetDocumentationMarkdownApi
  extends Pick<GetReadmeMarkdownApi, "documentationItems"> {}

function getDocumentationMarkdown(api: GetDocumentationMarkdownApi): string {
  const { documentationItems } = api;
  const { partitionedItems } = getPartitionedItems({
    documentationItems,
  });
  const { linkItems } = getLinkItems({
    documentationItems,
  });
  let resultMarkdown = getIndexMarkdown({
    partitionedItems,
  });
  resultMarkdown += getCategoriesMarkdown({
    partitionedItems,
    linkItems,
    documentationItems,
  });
  return resultMarkdown;
}

interface GetPartitionedItemsApi
  extends Pick<GetDocumentationMarkdownApi, "documentationItems"> {}

function getPartitionedItems(api: GetPartitionedItemsApi) {
  const { documentationItems } = api;
  const resultPartitionedItems: PartitionedItems = {};
  for (const someDocumentationItem of Object.values(documentationItems)) {
    const domainPartition =
      resultPartitionedItems[someDocumentationItem.itemDomain] ?? {};
    const categoryPartition =
      domainPartition[someDocumentationItem.itemCategory] ?? {};
    categoryPartition[someDocumentationItem.itemId] = someDocumentationItem;
    domainPartition[someDocumentationItem.itemCategory] = categoryPartition;
    resultPartitionedItems[someDocumentationItem.itemDomain] = domainPartition;
  }
  return {
    partitionedItems: resultPartitionedItems,
  };
}

interface PartitionedItems {
  [itemDomain: string]: {
    [itemCategory: string]: {
      [itemId: string]: DocumentationItem;
    };
  };
}

interface GetLinkItemsApi
  extends Pick<GetDocumentationMarkdownApi, "documentationItems"> {}

function getLinkItems(api: GetLinkItemsApi) {
  const { documentationItems } = api;
  const resultDefaultLinkKeyMap: Record<string, Array<DocumentationItem>> = {};
  for (const documentationItem of Object.values(documentationItems)) {
    const defaultLinkKey = documentationItem.itemName
      .toLowerCase()
      .replace(/\s/g, "-");
    const linkNameItems = resultDefaultLinkKeyMap[defaultLinkKey] ?? [];
    linkNameItems.push(documentationItem);
    resultDefaultLinkKeyMap[defaultLinkKey] = linkNameItems;
  }
  const resultLinkItems: Record<string, string> = {};
  for (const [defaultLinkKey, defaultLinkItems] of Object.entries(
    resultDefaultLinkKeyMap
  )) {
    if (defaultLinkItems.length > 1) {
      defaultLinkItems
        .sort((itemA, itemB) => {
          const itemStringA = `${itemA.itemDomain} ${itemA.itemCategory}`;
          const itemStringB = `${itemB.itemDomain} ${itemB.itemCategory}`;
          return itemStringA.localeCompare(itemStringB);
        })
        .forEach((someCollisionItem, collisionIndex) => {
          resultLinkItems[someCollisionItem.itemId] =
            collisionIndex === 0
              ? defaultLinkKey
              : `${defaultLinkKey}-${collisionIndex}`;
        });
    } else {
      resultLinkItems[defaultLinkItems[0]!.itemId] = defaultLinkKey;
    }
  }
  return {
    linkItems: resultLinkItems,
  };
}

interface GetIndexMarkdownApi
  extends Pick<ReturnType<typeof getPartitionedItems>, "partitionedItems"> {}

function getIndexMarkdown(api: GetIndexMarkdownApi) {
  const { partitionedItems } = api;
  let resultMarkdown = "## documentation\n";
  for (const [currentDomainKey, currentDomainPartition] of Object.entries(
    partitionedItems
  )) {
    for (const currentCategoryKey of Object.keys(currentDomainPartition)) {
      const { domainCategoryTitle, domainCategoryTitleLink } =
        getDomainCategoryTitleData({
          someDomainKey: currentDomainKey,
          someCategoryKey: currentCategoryKey,
        });
      resultMarkdown += `\n- **[${domainCategoryTitle}](${domainCategoryTitleLink})**\n`;
    }
  }
  return resultMarkdown;
}

interface GetCategoriesMarkdownApi
  extends Pick<GetDocumentationMarkdownApi, "documentationItems">,
    Pick<ReturnType<typeof getPartitionedItems>, "partitionedItems">,
    Pick<ReturnType<typeof getLinkItems>, "linkItems"> {}

function getCategoriesMarkdown(api: GetCategoriesMarkdownApi) {
  const { partitionedItems, documentationItems, linkItems } = api;
  let resultMarkdown = "";
  for (const [currentDomainKey, currentDomainPartition] of Object.entries(
    partitionedItems
  )) {
    for (const [currentCategoryKey, currentCategoryPartition] of Object.entries(
      currentDomainPartition
    )) {
      const { domainCategoryTitle } = getDomainCategoryTitleData({
        someDomainKey: currentDomainKey,
        someCategoryKey: currentCategoryKey,
      });
      resultMarkdown += `\n## ${domainCategoryTitle}\n`;
      for (const currentCategoryItem of Object.values(
        currentCategoryPartition
      )) {
        resultMarkdown += getItemMarkdown({
          documentationItems,
          linkItems,
          someCategoryItem: currentCategoryItem,
        });
      }
    }
  }
  return resultMarkdown;
}

interface GetItemMarkdownApi
  extends Pick<GetCategoriesMarkdownApi, "documentationItems" | "linkItems"> {
  someCategoryItem: DocumentationItem;
}

function getItemMarkdown(api: GetItemMarkdownApi) {
  const { someCategoryItem, documentationItems, linkItems } = api;
  let resultMarkdown = getItemHeaderMarkdown({
    someCategoryItem,
  });
  resultMarkdown += getItemSummaryMarkdown({
    someCategoryItem,
    documentationItems,
    linkItems,
  });
  return resultMarkdown;
}

interface GetItemHeaderMarkdownApi
  extends Pick<GetItemMarkdownApi, "someCategoryItem"> {}

function getItemHeaderMarkdown(api: GetItemHeaderMarkdownApi) {
  const { someCategoryItem } = api;
  return `\n###### ${someCategoryItem.itemName}\n`;
}

interface GetItemSummaryMarkdownApi
  extends Pick<
    GetItemMarkdownApi,
    "someCategoryItem" | "documentationItems" | "linkItems"
  > {}

function getItemSummaryMarkdown(api: GetItemSummaryMarkdownApi) {
  const { someCategoryItem, documentationItems, linkItems } = api;
  let resultMarkdown = `\n> ${someCategoryItem.itemSummary}\n`;
  for (const [matchedLinkItemText] of resultMarkdown.matchAll(/@\w+/g)) {
    const matchedDocumentationItem =
      documentationItems[matchedLinkItemText.slice(1)] ??
      throwInvalidPathError("getItemSummaryMarkdown");
    resultMarkdown = resultMarkdown.replace(
      matchedLinkItemText,
      `[${matchedDocumentationItem?.itemName}](#${
        linkItems[matchedDocumentationItem.itemId]
      })`
    );
  }
  return resultMarkdown;
}

interface GetDomainCategoryTitleDataApi {
  someDomainKey: string;
  someCategoryKey: string;
}

function getDomainCategoryTitleData(api: GetDomainCategoryTitleDataApi) {
  const { someCategoryKey, someDomainKey } = api;
  const pluralCategoryKey = `${someCategoryKey}s`;
  return {
    domainCategoryTitle: `${someDomainKey} _(${pluralCategoryKey})_`,
    domainCategoryTitleLink: `#${someDomainKey}-${pluralCategoryKey}`,
  };
}
