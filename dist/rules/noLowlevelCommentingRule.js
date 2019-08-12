"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var utils = require("tsutils");
/**
 * No Low-Level Commenting Rule
 * @author Silind Software
 * @license MIT
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walkOnComments);
    };
    Rule.FAILURE_STRING = 'Low-Level comments are not allowed';
    Rule.metadata = {
        ruleName: 'no-lowlevel-commenting',
        description: 'Fails in the presence of low-level comments that are not part of JSDocs',
        optionsDescription: 'No optional options can be provided',
        options: {
            type: 'boolean',
        },
        hasFix: true,
        type: 'style',
        typescriptOnly: true,
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walkOnComments(ctx) {
    utils.forEachComment(ctx.sourceFile, function (fullText, _a) {
        var kind = _a.kind, pos = _a.pos, end = _a.end;
        var fail = function () {
            var fix = new Lint.Replacement(pos, end - pos, '');
            ctx.addFailure(pos, end, Rule.FAILURE_STRING, fix);
        };
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
            var afterComment = fullText.substring(end).trim();
            var firstLine = afterComment.substring(0, afterComment.indexOf('\n'));
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
//# sourceMappingURL=noLowlevelCommentingRule.js.map