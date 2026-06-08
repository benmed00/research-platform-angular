// Karma configuration — https://karma-runner.github.io/latest/config/configuration-file.html

module.exports = function (config) {
  const isCI = process.env.CI === 'true';

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: true,
        seed: '4321',
        stopOnFailure: false
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage/research-platform'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', file: 'lcov.info' }
      ],
      check: {
        global: {
          statements: 90,
          branches: 85,
          functions: 90,
          lines: 90
        }
      }
    },
    reporters: isCI ? ['progress', 'coverage'] : ['progress', 'kjhtml'],
    browsers: isCI ? ['ChromeHeadless'] : ['Chrome'],
    singleRun: isCI,
    restartOnFileChange: !isCI,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000
  });
};
