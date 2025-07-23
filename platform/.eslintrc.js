module.exports = {
  root: true,
  // extends: [''],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  rules: {
    'turbo/no-undeclared-env-vars': [
      'error',
      {
        allowList: ['NODE_ENV', '^NEXT_[A-Z0-9_]+$'],
      },
    ],
  },
}
