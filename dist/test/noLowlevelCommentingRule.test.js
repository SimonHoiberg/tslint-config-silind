"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lintRunner_1 = require("./lintRunner");
var rule = 'no-lowlevel-commenting';
var errorMsg = 'Low-Level comments are not allowed';
describe('Linter will add failure', function () {
    it('should fail on inline comment', function () {
        var src = "\n      class A {\n        methodB() {\n          // here is in inliner\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(1);
        expect(result.failures[0].getFailure()).toBe(errorMsg);
    });
    it('should fail on multiline comment', function () {
        var src = "\n      class A {\n        methodB() {\n          /*\n            Here is a multiliner\n          */\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(1);
        expect(result.failures[0].getFailure()).toBe(errorMsg);
    });
});
describe('Linter will not add failure', function () {
    it('should not fail on JSDoc comment', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        methodB() {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
});
describe('Force output', function () {
    it('should write out the output', function () {
        var src = "\n      \n      export class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        methodB() {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.failures[0].getFailure()).toBe(errorMsg);
    });
});
//# sourceMappingURL=noLowlevelCommentingRule.test.js.map