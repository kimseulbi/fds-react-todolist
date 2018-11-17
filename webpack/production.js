const merge = require('webpack-merge');
const common = require('./common');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new MinifyPlugin()
  ]
});
