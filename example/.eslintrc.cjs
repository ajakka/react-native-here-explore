module.exports = {
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], // test files only
      extends: ['plugin:testing-library/react'],
    },
  ],
};
