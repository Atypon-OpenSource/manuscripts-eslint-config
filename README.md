# Manuscripts ESLint config

Shared ESLint config for Manuscripts projects.

## Install

Use the following command to install ESLint, this shared config and the plugins needed as dev dependencies:

```sh
pnpm add -D eslint typescript \
    @typescript-eslint/eslint-plugin @typescript-eslint/parser \
    eslint-plugin-prettier eslint-config-prettier \
    eslint-plugin-import eslint-plugin-simple-import-sort \
    eslint-plugin-react eslint-plugin-react-hooks \
    eslint-plugin-header eslint-plugin-jest  \
    eslint-plugin-promise \
    eslint-plugin-jsx-a11y \
    eslint-plugin-mdx \
    @manuscripts/eslint-config
```

## Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) in your project root:

```js
import manuscriptsConfig from '@manuscripts/eslint-config'

export default [
  ...manuscriptsConfig,
  // project-specific overrides
]
```

## Custom rules

This config ships two local rules:

- **`local/no-inline-object-types-in-hooks`** — Disallows inline object types as type arguments to `useQuery`, `useMutation`, and `useLazyQuery`. Encourages extracting them to named types/interfaces.
- **`local/no-query-hooks-outside-queries-file`** — Enforces that `useQuery`, `useMutation`, and `useLazyQuery` are only called inside files named `queries.ts` or `queries.tsx`.

## Diff-only linting

By default, only changed lines (compared to the current git diff) are linted via `eslint-plugin-diff`. To lint all files regardless of diff status, set the environment variable:

```sh
ESLINT_ALL_FILES=1 eslint .
```

## License header

The `header/header` rule enforces a short Apache 2.0 license header at the start of every file. 

To add the missing file header to all files in a project, run `eslint --ext .ts,.tsx src --fix`

To disable this rule, add the following to the "rules" section of the project's ESLint config:

```
  "header/header": false
```
