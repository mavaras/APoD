module.exports = {
  extends: [
    "airbnb-typescript"
  ],
  parserOptions: {
      project: './tsconfig.json',
  },
  plugins: ["simple-import-sort"],
  rules: {
    "react/prop-types": 0,
    "react/jsx-pascal-case": "off",
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/sort": "error",
    "global-require": "off",
  },
  env: {
    "jest": true
  }
};