import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

/**
 * No Low-Level Commenting Rule
 * @author Silind Software
 * @license MIT
 */

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING = 'Low-Level comments are not allowed';

  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'no-lowlevel-commenting',
    description: 'Fails in the presence of low-level comments that are not part of JSDocs',
    optionsDescription: 'No optional options can be provided',
    options: {
      type: 'boolean',
    },
    hasFix: true,
    type: 'style',
    typescriptOnly: true,
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walkOnComments);
  }
}

function walkOnComments(ctx: Lint.WalkContext): void {
  utils.forEachComment(ctx.sourceFile, (fullText, { kind, pos, end }) => {
    const fail = () => {
      const fix = new Lint.Replacement(pos, end - pos, '');
      ctx.addFailure(pos, end, Rule.FAILURE_STRING, fix);
    }

    if (fullText.slice(pos, pos + 3) === '/*!') {
      return;
    }

    if (fullText.slice(pos, pos + 2) === '//') {
      fail();
    }
    
    if (fullText.slice(pos, pos + 2) === '/*' && fullText.slice(pos, pos + 3) !== '/**') {
      fail();
    }

    if (fullText.slice(pos, pos + 3) === '/**') {
      const afterComment = fullText.substring(end).trim();
      const firstLine = afterComment.substring(0, afterComment.indexOf('\n'));

      if (firstLine.match(/\@.+/)) {
        return;
      }

      if (firstLine.match(/.*class.*/)) {
        return;
      }

      if (firstLine.match(/.*interface.*/)) {
        return;
      }

      if (firstLine.match(/.*enum.*/)) {
        return;
      }

      if (firstLine.match(/.+=*\s*\(/)) {
        return;
      }

      if (firstLine.match(/export\s+.+/)) {
        return;
      }

      if (firstLine.match(/[a-zA-Z0-9?]*:\s+([a-zA-Z0-9\'\:\<\>\[\]\s\?\|\=])*;/)) {
        return;
      }

      if (firstLine.match(/.*[a-zA-Z0-9]*\([a-zA-Z0-9\'\:\<\>\[\]\s,\?\|\=]*\).*/)) {
        return;
      }

      if (firstLine.match(/const\s+[a-zA-Z0-9]+\s+=\s+\([a-zA-Z0-9\:\<\>\[\]\s,\?\|\=]*\)\s+=>\s+.*\{/)) {
        return;
      }

      fail();
    }
  });
}
