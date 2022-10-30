module.exports = {
  'package.json': ['npm run format:package'],
  'src/**/*.ts': [() => 'npm run lint:ts'],
  'src/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  'tests/**/*.ts': [() => 'npm run lint:ts'],
  'tests/**/*.{ts,json}': ['prettier --write', 'eslint --fix'],
  '*.md': ['prettier --write'],
};
