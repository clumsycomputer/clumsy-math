const ChildProcess = require("child_process");
const FileSystem = require("fs");
const {
  TSDocParser,
  TSDocTagDefinition,
  TSDocTagSyntaxKind,
  DocNode,
  DocNodeKind,
  DocPlainText,
  DocParagraph,
  DocSoftBreak,
} = require("@microsoft/tsdoc");

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

ChildProcess.execSync(`./node_modules/.bin/tsc`);
try {
  ChildProcess.execSync(`./node_modules/.bin/api-extractor run`);
} catch {
  // swallow false negative
}
// manually configure parser configuration to match tsdoc.json
const tsdocParser = new TSDocParser();
tsdocParser.configuration.clear(true);
tsdocParser.configuration.addTagDefinition(
  new TSDocTagDefinition({
    tagName: "@concept",
    syntaxKind: TSDocTagSyntaxKind.ModifierTag,
  })
);
//
const tsdocPackageNode = JSON.parse(
  FileSystem.readFileSync("./temp_declarations/clumsy-math.api.json", "utf-8")
);
processDocNode(tsdocPackageNode);

function processDocNode(someDocNode) {
  if (someDocNode.docComment) {
    const nodeParserContext = tsdocParser.parseString(someDocNode.docComment);
    const parsedDocComment = nodeParserContext.docComment;
    if (parsedDocComment.modifierTagSet.hasTagName("@concept")) {
      const conceptSummary = getCommentSummary(parsedDocComment);
      console.log(conceptSummary);
      console.log(someDocNode);
    }
  }
  if (someDocNode.members) {
    for (const someNodeMember of someDocNode.members) {
      processDocNode(someNodeMember);
    }
  }
}

function getCommentSummary(someDocComment) {
  let resultString = "";
  someDocComment.summarySection.getChildNodes().forEach((someSectionNode) => {
    if (someSectionNode instanceof DocParagraph) {
      someSectionNode.getChildNodes().forEach((someParagraphNode) => {
        if (someParagraphNode instanceof DocPlainText) {
          resultString += someParagraphNode.text;
        } else if (someParagraphNode instanceof DocSoftBreak) {
          resultString += "\n";
        } else {
          throw new Error("invalid path: getSummarySectionString");
        }
      });
    } else {
      console.log(someSectionNode.kind);
    }
  });
  return resultString.trim();
}
