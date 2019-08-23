module.exports = {
  extends: './tslint-base.json',
  rules: {
    "no-lowlevel-commenting": true,
    "discreet-ternary": true,
    "structured-import": true,
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
    },
    "prefer-array-literal": { "options": [true, { "allow-type-parameters": true }], "severity": "error" },
    "ter-arrow-parens": { "options": ["as-needed", { "requireForBlockBody": true }], "severity": "warning" }
  }
}