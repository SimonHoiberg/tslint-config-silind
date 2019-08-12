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
    it('should fail on misplaced doc-comment', function () {
        var src = "\n      class A {\n        methodB() {\n          \n          /**\n           * This is not really a JSDoc comment\n           */\n          \n          const someVar = 5;\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(1);
        expect(result.failures[0].getFailure()).toBe(errorMsg);
    });
});
describe('Linter will not add failure', function () {
    it('should not fail on JSDoc comment above class', function () {
        var src = "\n    /**\n     * This is a JSDoc Comment\n     */\n      class A {\n        \n        methodB() {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above method', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        methodB() {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above function declaration', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        function someFunc(someParam: string, someNum: number) {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above function expression', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        const someFunc(someParam: string, someNum: number) => {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above function with params', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        const someFunc(controls?: TemplateResult | TemplateResult[] = 2) {\n\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above method with params and return type', function () {
        var src = "\n      class A {\n        /**\n         * This is a JSDoc Comment\n         */\n        public withType(inputType: 'number' | 'text' | 'date'): this {\n          return this;\n        }\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above decorator', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      @someDecorator()\n      class A {\n        \n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above interface', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export interface ISomeInterface {\n\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above interface property', function () {
        var src = "\n      export interface ISomeInterface {\n        /**\n         * This is a JSDoc Comment\n         */\n        someProp: string;\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above enum', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export enum SomeEnum {\n\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above multiline function expression', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export public someFunc = (\n        arg1,\n        arg2,\n        arg3\n      );\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above multiline function declaration', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export public someFunc(\n        arg1,\n        arg2,\n        arg3\n      );\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above exported variables', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export const someObj = {\n        someProp: 'prop',\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
    it('should not fail on JSDoc comment above default exported variables', function () {
        var src = "\n      /**\n       * This is a JSDoc Comment\n       */\n      export default {\n        someProp: 'prop',\n      }\n    ";
        var result = lintRunner_1.helper({ src: src, rule: rule });
        expect(result.errorCount).toBe(0);
    });
});
//# sourceMappingURL=noLowlevelCommentingRule.test.js.map