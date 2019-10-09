module.exports = {
  sets: {
      desktop: {
          files: 'tests/desktop'
      }
  },

  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://localhost:4444/wd/hub',

  browsers: {
      chrome: {
          desiredCapabilities: {
              browserName: 'firefox' // this browser should be installed on your OS
          }
      }
  }
};