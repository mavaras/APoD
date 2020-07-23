module.exports = {
  extends: [
    "airbnb"
  ],
  plugins: [
    "simple-import-sort",
    "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/prop-types": 0,
    "react/jsx-pascal-case": "off",
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/sort": "error",
    "global-require": "off",
    "comma-spacing": "off",
    "variable-name": [
      true,
      "allow-leading-underscore"
    ]
  },
  env: {
    "jest": true
  }
};