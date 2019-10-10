module.exports = {
  sets: {
      desktop: {
          files: 'tests/desktop'
      }
  },

  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://localhost:4444/wd/hub',
  waitTimeout: 3000,
  screenshotsDir: 'hermione/reports/screens',

  browsers: {
      chrome: {
          desiredCapabilities: {
              browserName: 'chrome' // this browser should be installed on your OS
          }
      }
  },

  plugins: {
    'html-reporter/hermione': {
        enabled: true,
        path: 'hermione/reports',
    }
  },
};