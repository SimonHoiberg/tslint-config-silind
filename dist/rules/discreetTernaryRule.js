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
 * Discreet Ternary
 * @author Silind Software
 * @license MIT
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new TernaryWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_RETURN = 'Ternary in return statements are not allowed';
    Rule.FAILURE_NO_ASSIGMENT = 'Ternary may only be used in assignment or declaration';
    Rule.FAILURE_NO_NESTED = 'Nested ternary are not allowed';
    Rule.FAILURE_NO_RENDERING = 'Ternary may not be used to render JSX Element';
    Rule.FAILURE_NO_COMPLEX_CONSEQUENT = 'The consequent of ternary is too complex';
    Rule.FAILURE_NO_COMPLEX_ALTERNATE = 'The alternate of ternary is too complex';
    Rule.FAILURE_NO_FALLBACK = 'Avoid using ternary for fallbacks.\nUse || instead';
    Rule.metadata = {
        ruleName: 'discreet-ternary',
        description: 'Prevents overuse of the ternary operator',
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
var TernaryWalker = /** @class */ (function (_super) {
    __extends(TernaryWalker, _super);
    function TernaryWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TernaryWalker.prototype.visitConditionalExpression = function (node) {
        _super.prototype.visitConditionalExpression.call(this, node);
        var isVariableDeclaration = node.parent.kind === ts.SyntaxKind.VariableDeclaration;
        var isVariableAssignment = node.parent.kind === ts.SyntaxKind.BinaryExpression;
        var isPropertyAssignment = node.parent.kind === ts.SyntaxKind.PropertyAssignment;
        var isArrowFunction = node.parent.kind === ts.SyntaxKind.ArrowFunction;
        var nTrue = utils.isParenthesizedExpression(node.whenTrue)
            ? utils.unwrapParentheses(node.whenTrue)
            : node.whenTrue;
        var nFalse = utils.isParenthesizedExpression(node.whenFalse)
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
    };
    TernaryWalker.prototype.fail = function (node, message) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
    };
    return TernaryWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=discreetTernaryRule.js.map