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
});

describe('Linter will not add failure', () => {
  it('should not fail on JSDoc comment', () => {
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
});
