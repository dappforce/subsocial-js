module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [ "off" ],
    "semi": "off",
    "comma-spacing": "warn",
    "array-bracket-spacing": [ "warn", "always" ],
    "react/display-name": "off",
    "padded-blocks": "off",
    "prefer-promise-reject-errors": "warn",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/indent": [ "warn", 2 ],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/camelcase": "off",
    "react/prop-types": "off",
    "@typescript-eslint/array-type": "off"
  }
}
