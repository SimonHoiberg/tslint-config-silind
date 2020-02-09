import { helper } from './lintRunner';

const rule = 'structured-import';

describe('Linter will add failure', () => {
  it('should fail on interface before module import', () => {
    const src = `
    import ISomeInterface from './ISomeInterface';
    import * as ts from 'typescript-test';
    import Something from '../somethingFromSource';
    import styles from './someStyle.scss';
    import './someCss.css';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Bad import order. An interface or enum cannot come before a module import.');
  });

  it('should fail on source import before interface', () => {
    const src = `
    import * as ts from 'typescript';
    import Something from '../somethingFromSource';
    import ISomeInterface from './ISomeInterface';
    import styles from './someStyle.scss';
    import './someCss.css';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Bad import order. An import from source folder cannot come before an interface or enum.');
  });

  it('should fail on css or scss before source import', () => {
    const src = `
    import * as ts from 'typescript';
    import ISomeInterface from './ISomeInterface';
    import styles from './someStyle.scss';
    import Something from '../somethingFromSource';
    import './someCss.css';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Bad import order. A css or scss import cannot come before an import from source folder.');
  });

  it('should fail on source import before module import', () => {
    const src = `
    import * as ts from 'typescript';
    import ISomeInterface from './ISomeInterface';
    import Something from '../somethingFromSource';
    import './someCss.css';
    import styles from './someStyle.scss';
    `;

    const result = helper({ src, rule });
    expect(result.errorCount).toBe(1);
    expect(result.failures[0].getFailure()).toBe('Bad import order. Unnamed import cannot come before a css or scss import.');
  });
});