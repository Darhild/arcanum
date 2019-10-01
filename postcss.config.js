module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: 'last 2 versions',
      stage: 0,
    }),
  ],
};