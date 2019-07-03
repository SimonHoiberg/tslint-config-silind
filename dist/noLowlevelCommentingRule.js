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
var ts = require("typescript");
/**
 * No Low-Level Commenting Rule
 * @author Silind Software
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
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walkOnComments(ctx) {
    var allJSDoc = ctx.sourceFile.statements.map(function (node) {
        if (ts.isJSDoc(node)) {
            return node.getText();
        }
    });
    utils.forEachComment(ctx.sourceFile, function (fullText, _a) {
        var kind = _a.kind, pos = _a.pos, end = _a.end;
        if (fullText.slice(pos, pos + 2) === '//') {
            ctx.addFailure(pos, end, Rule.FAILURE_STRING);
        }
        if (fullText.slice(pos, pos + 2) === '/*' && fullText.slice(pos, pos + 3) !== '/**') {
            if (!allJSDoc.find(function (text) { return text === fullText; })) {
                ctx.addFailure(pos, end, Rule.FAILURE_STRING);
            }
        }
    });
}
//# sourceMappingURL=noLowlevelCommentingRule.js.map