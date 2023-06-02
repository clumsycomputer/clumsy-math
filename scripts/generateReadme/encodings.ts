export interface DocumentationMap {
  [itemId: string]: DocumentationItem;
}

export type DocumentationItem =
  | ConceptDocumentationItem
  | InterfaceDocumentationItem
  | TypealiasDocumentationItem
  | FunctionDocumentationItem;

export interface ConceptDocumentationItem
  extends DocumentationItemBase<"concept"> {
  //   relatedEncodings: Array<unknown>;
  //   relatedFunctions: Array<unknown>;
}

export interface InterfaceDocumentationItem
  extends EncodingDocumentationItemBase<"interface"> {}

export interface TypealiasDocumentationItem
  extends EncodingDocumentationItemBase<"typealias"> {}

export interface EncodingDocumentationItemBase<EncodingType extends string>
  extends DocumentationItemBase<"encoding"> {
  encodingType: EncodingType;
}

export interface FunctionDocumentationItem
  extends DocumentationItemBase<"function"> {
  //   functionParameters: Array<unknown>;
  //   functionReturn: unknown;
}

interface DocumentationItemBase<ItemType extends string> {
  itemId: string;
  itemType: ItemType;
  itemDomain: string;
  itemName: string;
  itemSummary: string;
  //   itemExamples: Array<unknown>;
  //   itemConcepts: Array<unknown>;
}
