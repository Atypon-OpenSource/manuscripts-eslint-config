# Manuscripts ESLint config

Shared ESLint config for Manuscripts projects.

## Install

Use the following command to install ESLint, this shared config and the plugins needed as dev dependencies:

`yarn add --dev prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-header @typescript-eslint/eslint-plugin @manuscripts/eslint-config
`

## Usage

Use the following in a project's `.eslintrc` file (or `eslintConfig` section in `package.json`):

```json
{
  "extends": "@manuscripts/eslint-config",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## License header

The `header/header` rule enforces a short Apache 2.0 license header at the start of every file. 

To add the missing file header to all files in a project, run `eslint --project . --fix`

To disable this rule, add the following to the "rules" section of the project's ESLint config:

```
  "header/header": false
```
