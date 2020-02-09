import { helper } from './lintRunner';

const rule = 'discreet-ternary';

describe('Linter will add failure', () => {
  it('should fail on return', () => {
    const src = `
      return (2 + 2 === 4) ? 'correct math' : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(2);
    expect(result.failures[0].getFailure()).toBe('Ternary in return statements are not allowed');
    expect(result.failures[1].getFailure()).toBe('Ternary may only be used in assignment or declaration');
  });

  it('should fail on explicit return from arrow function', () => {
    const src = `
      const m = () => {
        return (2 + 2 === 4) ? 'correct math' : 'incorrect math';
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(2);
  });

  it('should fail on missing assignment or declaration', () => {
    const src = `
      (2 + 2 === 4) ? 'correct math' : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Ternary may only be used in assignment or declaration');
  });

  it('should fail on complexity', () => {
    const src = `
      const d = someVar
        ? 'stringLite'
            .indexOf('g')
            .toFixed(1)
        : 'string'
            .lastIndexOf('s');
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(2);
    expect(result.failures[0].getFailure()).toBe('The consequent of ternary is too complex');
    expect(result.failures[1].getFailure()).toBe('The alternate of ternary is too complex');
  });

  it('should fail on fallback', () => {
    const src = `
      const d = someVar ? someVar : 'somethingElse';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Avoid using ternary for fallbacks.\nUse || instead');
  });
});

describe('Linter will not add failure', () => {
  it('should not fail on declaration', () => {
    const src = `
      const m = (2 + 2 === 4) ? 'correct math' : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on multiline declaration', () => {
    const src = `
      const m = (2 + 2 === 4) 
        ? 'correct math' 
        : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on variable assignment', () => {
    const src = `
      let m = '';
      m = (2 + 2 === 4) ? 'correct math' : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on property assignment', () => {
    const src = `
      const m = {
        prop: (2 + 2 === 4) ? 'correct math' : 'incorrect math',
      }
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on multiline assignment', () => {
    const src = `
      let m = '';
      m = (2 + 2 === 4) 
        ? 'correct math' 
        : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });

  it('should not fail on implicit return', () => {
    const src = `
      const m = () => (2 + 2 === 4) ? 'correct math' : 'incorrect math';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(0);
  });
});
