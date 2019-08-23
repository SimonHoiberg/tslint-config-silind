# TSLint Config Silind [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Write%20scalable,%20clean%20and%20hygienic%20TypeScript%20code%20with%20TSlint%20Config%20Silind&url=https://github.com/Silind/tslint-config-silind&hashtags=tslint,typescript,frontend)

![NPM Version](https://img.shields.io/npm/v/tslint-config-silind.svg)
[![Github License](https://img.shields.io/github/license/Silind/tslint-config-silind.svg)](https://github.com/Silind/tslint-config-silind/blob/master/LICENSE)
[![Build Status](https://travis-ci.com/Silind/tslint-config-silind.svg?branch=master)](https://travis-ci.com/Silind/tslint-config-silind)
![Code Coverage](https://img.shields.io/codecov/c/github/Silind/tslint-config-silind.svg)

#### An opinionated TSLint configuration preset for writing *scalable*, *clean* and *hygienic* code

## Table of content

- [Getting Started](#getting-started)
- [Configuration preset](#configuration-preset)
- [Custom rules](#custom-rules)
- [Contributing](#contributing)
- [License](#license)
- [Get Help](#get-help)

## Getting Started
### Install
Install `tslint-config-silind` as a dev dependency using npm or yarn

**npm**:
```console
npm install -D tslint-config-silind
```

**yarn**:
```console
yarn add -D tslint-config-silind
```

### Create TSLint configuration (`tslint.json`)
Create a file `tslint.json` in your project root, and add the following:
```js
{
  "extends": ["tslint-config-silind"],
  "linterOptions": {
    "exclude": ["node_modules/**/*.ts"]
  }
}

```
If you already have a `tslint.json` file in your project, make sure to add `tslint-config-silind` under `extends`.

## Configuration preset
`tslint-config-silind` comes pre-configured with the following rules.  
These can of course be overridden in `tslint.json` under `rules`.

```js
rules: {
  "curly": true,
  "max-classes-per-file": false,
  "variable-name": false,
  "member-ordering": false,
  "ordered-imports": [false],
  "object-literal-sort-keys": [false],
  "no-console": [false],
  "import-name": [false],
  "align": [false],
  "max-line-length": { "options": [120], "severity": "warning" },
  "no-consecutive-blank-lines": { "options": [1], "severity": "warning" },
  "quotemark": [true, "single"],
  "array-type": [true, "array-simple"],
  "typedef": {
    "options": ["call-signature", "parameter"],
    "severity": "error"
  },
  "prefer-array-literal": { 
    "options": [true, { "allow-type-parameters": true }], 
    "severity": "error" 
  },
  "ter-arrow-parens": { 
    "options": ["as-needed", { "requireForBlockBody": true }], 
    "severity": "warning" 
  },
  "trailing-comma": {
    "options": [
      {
        "multiline": {
          "objects": "always",
          "arrays": "always",
          "functions": "ignore",
          "typeLiterals": "ignore"
        },
        "esSpecCompliant": true
      }
    ],
    "severity": "error"
  }
}
```

## Custom rules
*Any custom rule can be disabled and severity level can be set individually*  
*In this example, the rule `no-lowlevel-commenting` is configured with a severity-level of `error`:*
```
"no-lowlevel-commenting": { "severity": "error" }
```
*To disable a rule, simply set its value to `false`:*
```
"no-lowlevel-commenting": false
```

### The following table shows the custom rules that comes with `tslint-config-silind`.
| Has Fixer | TS Only | Rule Name | Description |
| :---          | :---:  | :---:  | :---        |
| :heavy_check_mark: | :heavy_check_mark: | `no-lowlevel-commenting` | Fails in the presence of low-level comments that are not part of JSDocs. [Read more](https://github.com/Silind/tslint-config-silind/blob/master/docs/noLowlevelCommentingRule.md) |
| :x: | :heavy_check_mark: | `discreet-ternary` | Prevents overuse of the ternary operator [Read more](https://github.com/Silind/tslint-config-silind/blob/master/docs/discreetTernaryRule.md) |
| :x: | :heavy_check_mark: | `structured-import`  | Requires import statements to be structured based on content and origin [Read more](https://github.com/Silind/tslint-config-silind/blob/master/docs/structuredImportRule.md) |

## Contributing

#### Issues
In the case of a bug report, bugfix or a suggestions, please feel very free to open an issue.

#### Pull request
Pull requests are always welcome, and I'll do my best to do reviews as fast as I can.

## License

This project is licensed under the [MIT License](https://github.com/Silind/tslint-config-silind/blob/master/LICENSE)

## Get Help
- Contact me on [Twitter](https://twitter.com/silindsoftware)
- If appropriate, [open an issue](https://github.com/Silind/tslint-config-silind/issues) on GitHub