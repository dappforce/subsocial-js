module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of
      // React to use
      version: 'detect',
    },
  },
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:react/recommended',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Integrate with prettier
    'prettier',
  ],
  plugins: ['jsx-a11y', 'prefer-object-spread', 'prettier', 'react-hooks'],
  rules: {
    // In an ideal world, we'd never have to use @ts-ignore, but that's not
    // possible right now.
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // Again, in theory this is a good rule, but it can cause a bit of
    // unhelpful noise.
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Another theoretically good rule, but sometimes we know better than
    // the linter.
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Accessibility rules
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    'jsx-a11y/label-has-associated-control': 'error',

    'prefer-object-spread/prefer-object-spread': 'error',

    // Use template strings instead of string concatenation
    'prefer-template': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Place to specify ESLint rules. Can be used to overwrite rules
    // specified from the extended configs

    // We're using TypeScript, so prop-types aren't so interesting
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
    'comma-spacing': 'warn',
    'array-bracket-spacing': ['warn', 'always'],
    'react/display-name': 'off',
    'padded-blocks': 'off',
    'prefer-promise-reject-errors': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/array-type': 'off',

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
    'no-multi-spaces': 'error',
    'space-before-function-paren': ['warn', 'always'],
    'non-nullish value': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      { multiline: { delimiter: 'none' } },
    ],
    'prefer-const': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    'object-curly-spacing': ['warn', 'always'],
  },
}
