// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { entryApp, outputApp, htmlTemplateApp } = require('../config/paths')

console.log('entryApp', entryApp)
console.log('outputApp', outputApp)
console.log('htmlTemplateApp', htmlTemplateApp)

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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Design System with Genma',
      template: htmlTemplateApp,
    }),
  ],
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
