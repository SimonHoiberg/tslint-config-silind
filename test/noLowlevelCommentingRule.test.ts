import { helper } from './lintRunner';

const rule = 'no-lowlevel-commenting';
const errorMsg = 'Low-Level comments are not allowed';

describe('Linter will add failure', () => {
  it('should fail on inline comment', () => {
    const src = `
      class A {
        methodB() {
          // here is in inliner
        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe(errorMsg);
  });

  it('should fail on multiline comment', () => {
    const src = `
      class A {
        methodB() {
          /*
            Here is a multiliner
          */
        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe(errorMsg);
  });

  it('should fail on misplaced doc-comment', () => {
    const src = `
      class A {
        methodB() {
          
          /**
           * This is not really a JSDoc comment
           */
          
          const someVar = 5;
        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe(errorMsg);
  });
});

describe('Linter will not add failure', () => {
  it('should not fail on JSDoc comment above class', () => {
    const src = `
    /**
     * This is a JSDoc Comment
     */
      class A {
        
        methodB() {

        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above method', () => {
    const src = `
      class A {
        /**
         * This is a JSDoc Comment
         */
        methodB() {

        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above function declaration', () => {
    const src = `
      class A {
        /**
         * This is a JSDoc Comment
         */
        function someFunc(someParam: string, someNum: number) {

        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above function expression', () => {
    const src = `
      class A {
        /**
         * This is a JSDoc Comment
         */
        const someFunc(someParam: string, someNum: number) => {

        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above function with params', () => {
    const src = `
      class A {
        /**
         * This is a JSDoc Comment
         */
        const someFunc(controls?: TemplateResult | TemplateResult[] = 2) {

        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above method with params and return type', () => {
    const src = `
      class A {
        /**
         * This is a JSDoc Comment
         */
        public withType(inputType: 'number' | 'text' | 'date'): this {
          return this;
        }
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above decorator', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      @someDecorator()
      class A {
        
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above interface', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export interface ISomeInterface {

      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above interface property', () => {
    const src = `
      export interface ISomeInterface {
        /**
         * This is a JSDoc Comment
         */
        someProp: string;
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above enum', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export enum SomeEnum {

      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above multiline function expression', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export public someFunc = (
        arg1,
        arg2,
        arg3
      );
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above multiline function declaration', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export public someFunc(
        arg1,
        arg2,
        arg3
      );
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above exported variables', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export const someObj = {
        someProp: 'prop',
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on JSDoc comment above default exported variables', () => {
    const src = `
      /**
       * This is a JSDoc Comment
       */
      export default {
        someProp: 'prop',
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });
});
