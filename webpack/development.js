const merge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
