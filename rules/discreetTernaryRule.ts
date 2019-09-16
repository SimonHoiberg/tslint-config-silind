import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

/**
 * Discreet Ternary
 * @author Silind Software
 * @license MIT
 */

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_RETURN = 'Ternary in return statements are not allowed';
  static FAILURE_NO_ASSIGMENT = 'Ternary may only be used in assignment or declaration';
  static FAILURE_NO_NESTED = 'Nested ternary are not allowed';
  static FAILURE_NO_RENDERING = 'Ternary may not be used to render JSX Element';
  static FAILURE_NO_COMPLEX_CONSEQUENT = 'The consequent of ternary is too complex';
  static FAILURE_NO_COMPLEX_ALTERNATE = 'The alternate of ternary is too complex';
  static FAILURE_NO_FALLBACK = 'Avoid using ternary for fallbacks.\nUse || instead'

  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'discreet-ternary',
    description: 'Prevents overuse of the ternary operator',
    optionsDescription: 'No optional options can be provided',
    options: {
      type: 'boolean',
    },
    hasFix: true,
    type: 'style',
    typescriptOnly: true,
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new TernaryWalker(sourceFile, this.getOptions()));
  }
}

class TernaryWalker extends Lint.RuleWalker {
  public visitConditionalExpression(node: ts.ConditionalExpression): void {
    super.visitConditionalExpression(node);
    const isVariableDeclaration = node.parent.kind === ts.SyntaxKind.VariableDeclaration;
    const isVariableAssignment = node.parent.kind === ts.SyntaxKind.BinaryExpression;
    const isPropertyAssignment = node.parent.kind === ts.SyntaxKind.PropertyAssignment;
    const isArrowFunction = node.parent.kind === ts.SyntaxKind.ArrowFunction;

    const nTrue = utils.isParenthesizedExpression(node.whenTrue)
      ? utils.unwrapParentheses(node.whenTrue)
      : node.whenTrue;

    const nFalse = utils.isParenthesizedExpression(node.whenFalse)
      ? utils.unwrapParentheses(node.whenFalse)
      : node.whenFalse;

    if (utils.isReturnStatement(node.parent)) {
      this.fail(node, Rule.FAILURE_RETURN);
    }

    if (!isVariableDeclaration && !isVariableAssignment && !isArrowFunction && !isPropertyAssignment) {
      this.fail(node, Rule.FAILURE_NO_ASSIGMENT);
    }

    if (utils.isConditionalExpression(nTrue) || utils.isConditionalExpression(nFalse)) {
      this.fail(node, Rule.FAILURE_NO_NESTED);
    }

    if (!utils.isSameLine(nTrue.getSourceFile(), nTrue.getStart(), nTrue.getEnd())) {
      this.fail(node, Rule.FAILURE_NO_COMPLEX_CONSEQUENT);
    }

    if (!utils.isSameLine(nFalse.getSourceFile(), nFalse.getStart(), nFalse.getEnd())) {
      this.fail(node, Rule.FAILURE_NO_COMPLEX_ALTERNATE);
    }

    if (utils.isJsxElement(nTrue) || utils.isJsxElement(nFalse)) {
      this.fail(node, Rule.FAILURE_NO_RENDERING);
    }

    if (node.condition.getText() === nTrue.getText()) {
      this.fail(node, Rule.FAILURE_NO_FALLBACK);
    }
  }

  private fail(node: ts.Node, message: string): void {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
  }
}
