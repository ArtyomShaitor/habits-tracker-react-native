module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["@react-native", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react-native/no-inline-styles": 0,
  },
};
