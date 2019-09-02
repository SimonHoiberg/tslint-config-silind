import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

/**
 * Discreet Ternary
 * @author Silind Software
 * @license MIT
 */

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE = '';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'structured-import',
    description: 'Requires import statements to be structured based on content and origin',
    descriptionDetails: Lint.Utils.dedent`
      Imports should adhere to the following structure of order:
        1. Import that comes from node_modules
        2. Import of interfaces / enums
        3. Import that comes from src
        4. Import of styles (css / scss)
        5. Import of other, unspecified type
        6. Unnamed imports
    `,
    optionsDescription: 'No optional options can be provided',
    options: {
      type: 'boolean',
    },
    hasFix: true,
    type: 'style',
    typescriptOnly: true,
  };

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ImportWalker(sourceFile, this.getOptions()));
  }
}

enum ImportNodes {
  ModulesNode = 'a module import',
  InterfaceEnumNode = 'an interface or enum',
  SourceNode = 'an import from source folder',
  StyleNode = 'a css or scss import',
  Other = 'an import of unspecified type',
  Unnamed = 'unnamed import',
}

class ImportWalker extends Lint.RuleWalker {
  private importIdealOrder = {
    [ImportNodes.ModulesNode]: 0,
    [ImportNodes.InterfaceEnumNode]: 1,
    [ImportNodes.SourceNode]: 2,
    [ImportNodes.StyleNode]: 3,
    [ImportNodes.Other]: 4,
    [ImportNodes.Unnamed]: 5,
  };

  public visitImportDeclaration(node: ts.ImportDeclaration): void {
    const nextNode = utils.getNextStatement(node);

    if (!nextNode || nextNode.kind !== ts.SyntaxKind.ImportDeclaration) {
      return;
    }

    const currentNodeType = this.getNodeType(node);
    const nextNodeType = this.getNodeType(nextNode as ts.ImportDeclaration);

    const currentTypeOrder = this.importIdealOrder[currentNodeType];
    const nextNodeTypeOrder = this.importIdealOrder[nextNodeType];

    if (currentTypeOrder > nextNodeTypeOrder) {
      this.fail(node, `Bad import order. ${this.upperCaseFirstLetter(currentNodeType)} cannot come before ${nextNodeType}.`);
    }
  }

  private getNodeType(node: ts.ImportDeclaration): ImportNodes {
    const importText = this.removeQuotes(node.moduleSpecifier.getText());
    const importName = importText.match(/[a-zA-Z0-9]+\.*([a-zA-Z0-9]*\.*)*/);

    if (!node.getText().includes('from')) {
      return ImportNodes.Unnamed;
    }

    if (importText.match(/^[a-zA-Z0-9-]+.$/)) {
      return ImportNodes.ModulesNode;
    }

    if (importName && importName.length > 0) {
      if (importName[0].substring(0, 1) === 'I') {
        return ImportNodes.InterfaceEnumNode;
      }

      if (importName[0].includes('interface')) {
        return ImportNodes.InterfaceEnumNode;
      }

      if (importName[0].includes('enum')) {
        return ImportNodes.InterfaceEnumNode;
      }
    }

    if (importText.match(/.+\.[css|scss]+/)) {
      return ImportNodes.StyleNode;
    }

    if (importText.match(/^((.*\/)+.*)|(.)/)) {
      return ImportNodes.SourceNode;
    }

    return ImportNodes.Other;
  }

  private removeQuotes(value: string): string {
    let removedQuotes = value;
    if (removedQuotes && removedQuotes.length > 1 && (removedQuotes[0] === `'` || removedQuotes[0] === `"`)) {
      removedQuotes = removedQuotes.substr(1, removedQuotes.length - 2);
    }

    return removedQuotes;
  }

  private upperCaseFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  private fail(node: ts.Node, message: string): void {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
  }
}
