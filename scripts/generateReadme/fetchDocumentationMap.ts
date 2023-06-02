import {
  ApiDeclaredItem,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiPackage,
  ApiTypeAlias,
} from "@microsoft/api-extractor-model";
import { throwInvalidPathError } from "../helpers/throwInvalidPath";
import { DocumentationItem, DocumentationMap } from "./encodings";

export interface FetchDocumentationMapApi {
  packageItem: ApiPackage;
}

export function fetchDocumentationMap(api: FetchDocumentationMapApi) {
  const { packageItem } = api;
  const resultDocumentationMap: DocumentationMap = {};
  processApiItem({
    resultDocumentationMap,
    someApiItem: packageItem,
  });
  return {
    documentationMap: resultDocumentationMap,
  };
}

interface ProcessApiItemApi {
  someApiItem: ApiItem;
  resultDocumentationMap: DocumentationMap;
}

function processApiItem(api: ProcessApiItemApi) {
  const { someApiItem, resultDocumentationMap } = api;
  if (someApiItem instanceof ApiDeclaredItem && someApiItem.tsdocComment) {
    const currentDocumentationItem = getDocumentationItem({
      someApiItem,
    });
    resultDocumentationMap[currentDocumentationItem.itemId] =
      currentDocumentationItem;
  }
  for (const someMemberItem of someApiItem.members) {
    processApiItem({
      resultDocumentationMap,
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
      itemType: "function",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: "todo",
    };
  } else if (someApiItem instanceof ApiInterface) {
    return {
      itemType: "encoding",
      encodingType: "interface",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: "todo",
    };
  } else if (
    someApiItem instanceof ApiTypeAlias &&
    itemId.endsWith("CONCEPT")
  ) {
    return {
      itemType: "concept",
      itemId,
      itemDomain,
      itemName: itemId
        .split("_")
        .slice(1, -1)
        .map((someNameToken) => someNameToken.toLowerCase())
        .join(" "),
      itemSummary: "todo",
    };
  } else if (someApiItem instanceof ApiTypeAlias) {
    return {
      itemType: "encoding",
      encodingType: "typealias",
      itemId,
      itemDomain,
      itemName: itemId,
      itemSummary: "todo",
    };
  } else {
    throwInvalidPathError("getDocumentationItem");
  }
}
