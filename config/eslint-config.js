import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import headerPlugin from 'eslint-plugin-header'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import * as mdxPlugin from 'eslint-plugin-mdx'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import { apacheLicense } from './apache-license.js'
import noInlineObjectTypesInHooks from '../rules/no-inline-object-types-in-hooks.mjs'
import noQueryHooksOutsideQueriesFile from '../rules/no-query-hooks-outside-queries-file.mjs'

// eslint-plugin-header has a malformed schema that fails ESLint 9+ strict schema validation
headerPlugin.rules.header.meta.schema = false

export default [
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jestPlugin.configs['flat/recommended'],
  jsxA11yPlugin.flatConfigs.recommended,
  eslintConfigPrettier,
  promisePlugin.configs['flat/recommended'],
  reactPlugin.configs.flat.recommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      header: headerPlugin,
      prettier: prettierPlugin,
      local: {
        rules: {
          'no-inline-object-types-in-hooks': noInlineObjectTypesInHooks,
          'no-query-hooks-outside-queries-file': noQueryHooksOutsideQueriesFile,
        },
      },
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'local/no-inline-object-types-in-hooks': 'error',
      'local/no-query-hooks-outside-queries-file': 'error',
      curly: 'error',
      'header/header': [2, 'block', apacheLicense()],
      'import/order': 'off',
      'prettier/prettier': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    ...mdxPlugin.flat,
    rules: {
      ...mdxPlugin.flat.rules,
      'header/header': 'off',
    },
  },
]
