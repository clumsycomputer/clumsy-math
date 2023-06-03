import { readFileSync } from "fs";
import { fetchDocumentationItems } from "./fetchDocumentationItems";
import { DocumentationItem } from "./encodings";

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
  let resultDocumentationMarkdown = getDocumentationIndexMarkdown({
    partitionedItems,
  });
  resultDocumentationMarkdown += getDocumentationItemsMarkdown({
    partitionedItems,
  });
  return resultDocumentationMarkdown;
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

interface GetDocumentationIndexMarkdownApi
  extends Pick<ReturnType<typeof getPartitionedItems>, "partitionedItems"> {}

function getDocumentationIndexMarkdown(api: GetDocumentationIndexMarkdownApi) {
  const { partitionedItems } = api;
  let documentationMarkdown = "## documentation\n";
  for (const [currentDomainKey, currentDomainPartition] of Object.entries(
    partitionedItems
  )) {
    for (const currentCategoryKey of Object.keys(currentDomainPartition)) {
      const pluralCategoryKey = `${currentCategoryKey}s`;
      const domainCategoryTitle = `${currentDomainKey} _(${pluralCategoryKey})_`;
      documentationMarkdown += `\n- **[${domainCategoryTitle}](#${currentDomainKey}-${pluralCategoryKey})**\n`;
    }
  }
  return documentationMarkdown;
}

interface GetDocumentationItemsMarkdownApi
  extends Pick<ReturnType<typeof getPartitionedItems>, "partitionedItems"> {}

function getDocumentationItemsMarkdown(api: GetDocumentationItemsMarkdownApi) {
  const { partitionedItems } = api;
  return "todo";
}
