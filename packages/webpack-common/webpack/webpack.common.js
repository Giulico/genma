// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { entryApp, outputApp } = require('../config/paths')

console.log('entryApp', entryApp)
console.log('outputApp', outputApp)

module.exports = {
  entry: {
    app: entryApp,
  },
  output: {
    path: outputApp,
    filename: '[name].js',
  },
  stats: 'normal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  // TODO: Production only
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true, // set to true if you want JS source maps
  //     }),
  //   ],
  // },
}
