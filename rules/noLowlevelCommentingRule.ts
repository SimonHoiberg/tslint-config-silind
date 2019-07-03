import * as Lint from 'tslint';
import * as utils from "tsutils";
import * as ts from 'typescript';

/**
 * No Low-Level Commenting Rule
 * TSLint Rule boilerplate from
 * https://github.com/eranshabi/tslint-custom-rules-boilerplate/blob/master/src/myCustomRule.ts
 * @author Silind Software
 */

const LOW_LEVEL_FAILURE = 'Low-Level comments are not allowed'

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING = 'Use of debugger statements is forbidden.';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walkOnComments);
  }
}

function walkOnComments(ctx: Lint.WalkContext) {
  utils.forEachComment(ctx.sourceFile, (fullText, { kind, pos, end }) => {
    if (fullText.slice(pos, pos + 2) === '//') {
      ctx.addFailure(pos, end, LOW_LEVEL_FAILURE);
    }
  });
}