// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {
  entryApp,
  outputApp,
  htmlFileName,
  htmlTemplateApp,
} = require('../config/paths')

module.exports = {
  entry: {
    app: entryApp,
  },
  output: {
    path: outputApp,
    filename: '[name].js',
  },
  stats: 'normal',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
            },
          },
          {
            loader: 'source-map-loader',
          },
        ],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hrm: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'raw-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
            },
          },
          {
            loader: '@mdx-js/loader',
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlTemplateApp,
      filename: htmlFileName,
      minify: false,
      alwaysWriteToDisk: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
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
