// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rehypePrism = require('@mapbox/rehype-prism')

const {
  entryApp,
  outputApp,
  htmlTemplateApp,
  postCssConfig,
} = require('../config/paths')

module.exports = {
  entry: [entryApp],
  output: {
    path: outputApp,
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name]-[contenthash].js'
        : '[name].[hash].js',
  },
  stats: 'normal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-hot-loader/babel'],
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
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: postCssConfig,
              },
            },
          },
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
              plugins: ['react-hot-loader/babel'],
              presets: ['@babel/env', '@babel/preset-react'],
            },
          },
          {
            loader: '@mdx-js/loader',
            options: {
              rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
            },
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        type: 'json', // Required by Webpack v4
        use: 'yaml-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlTemplateApp,
      minify: false,
      alwaysWriteToDisk: true,
    }),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === 'production'
          ? '[name]-[contenthash].css'
          : '[name]-[hash].css',
      hmr: process.env.NODE_ENV === 'production' ? false : true,
    }),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      assets: '../../assets',
      config: '../../config',
    },
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
