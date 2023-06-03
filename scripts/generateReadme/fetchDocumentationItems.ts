import {
  ApiDeclaredItem,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiPackage,
  ApiTypeAlias,
} from "@microsoft/api-extractor-model";
import { throwInvalidPathError } from "../helpers/throwInvalidPath";
import { DocumentationItem, DocumentationItems } from "./encodings";
import {
  DocEscapedText,
  DocLinkTag,
  DocParagraph,
  DocPlainText,
  DocSoftBreak,
} from "@microsoft/tsdoc";

export interface FetchDocumentationItemsApi {
  packageItem: ApiPackage;
}

export function fetchDocumentationItems(api: FetchDocumentationItemsApi) {
  const { packageItem } = api;
  const resultDocumentationItems: DocumentationItems = {};
  processApiItem({
    resultDocumentationItems,
    someApiItem: packageItem,
  });
  return {
    documentationItems: resultDocumentationItems,
  };
}

interface ProcessApiItemApi {
  someApiItem: ApiItem;
  resultDocumentationItems: DocumentationItems;
}

function processApiItem(api: ProcessApiItemApi) {
  const { someApiItem, resultDocumentationItems } = api;
  if (someApiItem instanceof ApiDeclaredItem && someApiItem.tsdocComment) {
    const currentDocumentationItem = getDocumentationItem({
      someApiItem,
    });
    resultDocumentationItems[currentDocumentationItem.itemId] =
      currentDocumentationItem;
  }
  for (const someMemberItem of someApiItem.members) {
    processApiItem({
      resultDocumentationItems,
      someApiItem: someMemberItem,
    });
  }
}

interface GetDocumentationItemApi {
  someApiItem: ApiDeclaredItem;
}

function getDocumentationItem(api: GetDocumentationItemApi): DocumentationItem {
  const { someApiItem } = api;
  const itemId =
    someApiItem.canonicalReference.symbol?.componentPath?.component.toString()!;
  const itemDomain = someApiItem.fileUrlPath?.split("/")[1]!;
  if (someApiItem instanceof ApiFunction) {
    return {
      itemCategory: "function",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: getItemSummary({
        someApiItem,
      }),
    };
  } else if (someApiItem instanceof ApiInterface) {
    return {
      itemCategory: "encoding",
      encodingType: "interface",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: getItemSummary({
        someApiItem,
      }),
    };
  } else if (
    someApiItem instanceof ApiTypeAlias &&
    itemId.endsWith("CONCEPT")
  ) {
    return {
      itemCategory: "concept",
      itemId,
      itemDomain,
      itemName: itemId
        .split("_")
        .slice(1, -1)
        .map((someNameToken) => someNameToken.toLowerCase())
        .join(" "),
      itemSummary: getItemSummary({
        someApiItem,
      }),
    };
  } else if (someApiItem instanceof ApiTypeAlias) {
    return {
      itemCategory: "encoding",
      encodingType: "typealias",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: getItemSummary({
        someApiItem,
      }),
    };
  } else {
    throwInvalidPathError("getDocumentationItem");
  }
}

interface GetItemSummaryApi
  extends Pick<GetDocumentationItemApi, "someApiItem"> {}

function getItemSummary(api: GetItemSummaryApi): string {
  const { someApiItem } = api;
  const summaryParagraphNode =
    someApiItem.tsdocComment?.summarySection.getChildNodes()[0];
  return summaryParagraphNode instanceof DocParagraph
    ? summaryParagraphNode
        .getChildNodes()
        .reduce((resultSummary, someSummaryNode) => {
          if (someSummaryNode instanceof DocPlainText) {
            resultSummary += someSummaryNode.text;
          } else if (
            someSummaryNode instanceof DocLinkTag &&
            someSummaryNode.codeDestination?.memberReferences[0] &&
            someSummaryNode.codeDestination?.memberReferences[0]
              .memberIdentifier
          ) {
            const linkedItemId =
              someSummaryNode.codeDestination?.memberReferences[0]
                .memberIdentifier.identifier;
            resultSummary += `@${linkedItemId}`;
          } else if (someSummaryNode instanceof DocSoftBreak) {
            resultSummary += "\n";
          } else if (someSummaryNode instanceof DocEscapedText) {
            resultSummary += someSummaryNode.decodedText;
          } else {
            throwInvalidPathError("getItemSummary.itemSummary");
          }
          return resultSummary;
        }, "")
    : throwInvalidPathError("getItemSummary");
}
