module.exports = {
  parser: "@babel/eslint-parser",
  plugins: [
    "babel",
    "import"
  ],
  env: {
    "browser": true,
    "node": true,
    "jest": true,
  },
  extends: [
    "airbnb"
  ],
  globals: {
    "__DEV__": true,
  },
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "babel/semi": "error",
    "babel/no-invalid-this": "error",
    "babel/object-curly-spacing": "off",
    "babel/quotes": "off",
    "babel/no-unused-expressions": "error",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/exports-last": "error",
    "import/no-namespace": "error",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/label-has-for": "off",
    "react/jsx-filename-extension": "off",
    "react/prefer-stateless-function": "off",
    "no-prototype-builtins": "off",
    "no-class-assign": "error",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "object-curly-newline": "off",
    "guard-for-in": "off",
    "consistent-return": "off",
    "react/forbid-prop-types": "off",
    "react/sort-comp": "off",
    "react/no-unused-state": "off",
    "arrow-parens": ["error", "always"],
    "quote-props": ["error", "consistent-as-needed"],
    "object-shorthand": ["error", "consistent-as-needed"],
    "no-restricted-syntax": ["off", "ForInStatement"],
    "linebreak-style": ["error", "unix"],
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": ["error"],
    "react/prop-types": ["error", {
      ignore: ["actions", "context"]
    }],
    "no-return-assign": ["off"],
    "react/destructuring-assignment": ["error", "always",
      { "ignoreClassFields": true }
    ],
    "react/prop-types": ["error", {
      ignore: ["actions", "context"]
    }],
    "no-multiple-empty-lines": ["error",
      { "max": 1, "maxEOF": 1 }
    ],
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }, {
      "enforceForRenamedProperties": false
    }],
    "quotes": ["warn", "single", {
      allowTemplateLiterals: true
    }],
    "padded-blocks": ["warn", {
      classes:"always"
    }],
    "no-unused-vars": ["error", {
      args: "none"
    }],
    // --- Framework house-style overrides ---------------------------------------------------------
    // Kawax declares propTypes/defaultProps/displayName/contextTypes and `state` as class fields,
    // not as out-of-body statics or constructor assignments — a deliberate, codebase-wide style.
    "react/static-property-placement": "off",
    "react/state-in-constructor": "off",
    // Component/Junction/Router expose framework lifecycle/render helpers that are invoked
    // dynamically (not by JSX call sites), so the "unused method" heuristic misfires.
    "react/no-unused-class-component-methods": "off",
    // Router intentionally forwards an open-ended prop bag to the matched component.
    "react/jsx-props-no-spreading": "off",
    // Component is a class-component HOC factory; the Provider value cannot be memoised here.
    "react/jsx-no-constructed-context-values": "off",
    // `Smart` returns the result of `initialize()` from its constructor — load-bearing, by design.
    "no-constructor-return": "off",
    // Barrel re-exports use `export default from './Core'`.
    "no-restricted-exports": "off",
    // Action.js drives dispatch through deliberate (async) promise executors.
    "no-async-promise-executor": "off",
    "no-promise-executor-return": "off",
    // Several internal signatures place defaulted params before the resource/union key argument.
    "default-param-last": "off",
    // HOC factories and test fixtures legitimately define multiple classes per file.
    "max-classes-per-file": "off"
  }
}
