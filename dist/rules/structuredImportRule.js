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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
        return this.applyWithWalker(new ImportWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE = '';
    Rule.metadata = {
        ruleName: 'structured-import',
        description: 'Requires import statements to be structured based on content and origin',
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      Imports should adhere to the following structure of order:\n        1. Import that comes from node_modules\n        2. Import of interfaces / enums\n        3. Import that comes from src\n        4. Import of styles (css / scss)\n        5. Import of other, unspecified type\n        6. Unnamed imports\n    "], ["\n      Imports should adhere to the following structure of order:\n        1. Import that comes from node_modules\n        2. Import of interfaces / enums\n        3. Import that comes from src\n        4. Import of styles (css / scss)\n        5. Import of other, unspecified type\n        6. Unnamed imports\n    "]))),
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
var ImportNodes;
(function (ImportNodes) {
    ImportNodes["ModulesNode"] = "a module import";
    ImportNodes["InterfaceEnumNode"] = "an interface or enum";
    ImportNodes["SourceNode"] = "an import from source folder";
    ImportNodes["StyleNode"] = "a css or scss import";
    ImportNodes["Other"] = "an import of unspecified type";
    ImportNodes["Unnamed"] = "unnamed import";
})(ImportNodes || (ImportNodes = {}));
var ImportWalker = /** @class */ (function (_super) {
    __extends(ImportWalker, _super);
    function ImportWalker() {
        var _a;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.importIdealOrder = (_a = {},
            _a[ImportNodes.ModulesNode] = 0,
            _a[ImportNodes.InterfaceEnumNode] = 1,
            _a[ImportNodes.SourceNode] = 2,
            _a[ImportNodes.StyleNode] = 3,
            _a[ImportNodes.Other] = 4,
            _a[ImportNodes.Unnamed] = 5,
            _a);
        return _this;
    }
    ImportWalker.prototype.visitImportDeclaration = function (node) {
        var nextNode = utils.getNextStatement(node);
        if (!nextNode || nextNode.kind !== ts.SyntaxKind.ImportDeclaration) {
            return;
        }
        var currentNodeType = this.getNodeType(node);
        var nextNodeType = this.getNodeType(nextNode);
        var currentTypeOrder = this.importIdealOrder[currentNodeType];
        var nextNodeTypeOrder = this.importIdealOrder[nextNodeType];
        if (currentTypeOrder > nextNodeTypeOrder) {
            this.fail(node, "Bad import order. " + this.upperCaseFirstLetter(currentNodeType) + " cannot come before " + nextNodeType + ".");
        }
    };
    ImportWalker.prototype.getNodeType = function (node) {
        var importText = this.removeQuotes(node.moduleSpecifier.getText());
        var importName = importText.match(/[a-zA-Z0-9]+\.*([a-zA-Z0-9]*\.*)*/);
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
    };
    ImportWalker.prototype.removeQuotes = function (value) {
        var removedQuotes = value;
        if (removedQuotes && removedQuotes.length > 1 && (removedQuotes[0] === "'" || removedQuotes[0] === "\"")) {
            removedQuotes = removedQuotes.substr(1, removedQuotes.length - 2);
        }
        return removedQuotes;
    };
    ImportWalker.prototype.upperCaseFirstLetter = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    ImportWalker.prototype.fail = function (node, message) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), message));
    };
    return ImportWalker;
}(Lint.RuleWalker));
var templateObject_1;
//# sourceMappingURL=structuredImportRule.js.map