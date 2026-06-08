// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';

const jsdocDefinedTags = [
  'remarks',
  'template',
  'file',
  'deprecated',
  'see',
  'example',
  'throws',
  'property',
  'enum',
  'member'
];

const jsdocRequireJsdoc = [
  'warn',
  {
    publicOnly: true,
    require: {
      ArrowFunctionExpression: false,
      ClassDeclaration: true,
      ClassExpression: false,
      FunctionDeclaration: true,
      FunctionExpression: false,
      MethodDefinition: true
    }
  }
];

export default tseslint.config(
  {
    ignores: ['projects/**/*', 'dist/**/*', 'coverage/**/*']
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier
    ],
    plugins: { jsdoc },
    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json']
      }
    },
    settings: {
      jsdoc: { mode: 'typescript' }
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-inject': 'off',
      'jsdoc/check-tag-names': ['warn', { definedTags: jsdocDefinedTags }],
      'jsdoc/check-types': 'off',
      'jsdoc/no-types': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/require-jsdoc': jsdocRequireJsdoc,
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-returns-description': 'warn'
    }
  },
  {
    files: [
      'src/app/core/**/*.ts',
      'src/app/models/**/*.ts',
      'src/app/shared/**/*.ts',
      'src/testing/**/*.ts',
      'src/environments/**/*.ts'
    ],
    rules: {
      'jsdoc/check-tag-names': ['error', { definedTags: jsdocDefinedTags }],
      'jsdoc/no-types': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: false,
            ClassDeclaration: true,
            ClassExpression: false,
            FunctionDeclaration: true,
            FunctionExpression: false,
            MethodDefinition: true
          },
          contexts: [
            'ExportNamedDeclaration > TSInterfaceDeclaration',
            'ExportNamedDeclaration > TSEnumDeclaration',
            'ExportNamedDeclaration > TSTypeAliasDeclaration'
          ]
        }
      ],
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-description': 'error'
    }
  },
  {
    files: ['**/*.spec.ts', '**/*.module.ts', '**/*-routing.module.ts', 'src/main.ts'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/check-tag-names': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintConfigPrettier
    ],
    rules: {}
  }
);
