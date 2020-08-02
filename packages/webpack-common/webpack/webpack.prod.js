const baseConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  devtool: 'source-map',
})
