export interface DocumentationItems {
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
  itemDomain: string;
  itemCategory: ItemType;
  itemName: string;
  itemSummary: string;
  itemExamples: Array<{
    exampleLanguage: string;
    exampleCode: string;
  }>;
  //   itemConcepts: Array<unknown>;
}
