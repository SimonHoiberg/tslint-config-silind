import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

/**
 * No Low-Level Commenting Rule
 * @author Silind Software
 */

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING = 'Low-Level comments are not allowed';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walkOnComments);
  }
}

function walkOnComments(ctx: Lint.WalkContext): void {
  const allJSDoc = ctx.sourceFile.statements.map((node: ts.Node) => {
    if (ts.isJSDoc(node)) {
      return node.getText();
    }
  });

  utils.forEachComment(ctx.sourceFile, (fullText, { kind, pos, end }) => {
    if (fullText.slice(pos, pos + 2) === '//') {
      ctx.addFailure(pos, end, Rule.FAILURE_STRING);
    }
    if (fullText.slice(pos, pos + 2) === '/*' && fullText.slice(pos, pos + 3) !== '/**') {
      if (!allJSDoc.find((text: string) => text === fullText)) {
        ctx.addFailure(pos, end, Rule.FAILURE_STRING);
      }
    }
  });
}
