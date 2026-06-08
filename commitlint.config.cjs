/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ],
    'scope-enum': [
      2,
      'always',
      [
        'app',
        'auth',
        'ci',
        'core',
        'dashboard',
        'deps',
        'docs',
        'domain',
        'mock-api',
        'pipeline',
        'repo',
        'shell',
        'test',
        'toolchain',
        'tooling'
      ]
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 120],
    'footer-leading-blank': [2, 'always']
  }
};
