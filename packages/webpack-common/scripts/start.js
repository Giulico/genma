// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'
const path = require('path')

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { merge } = require('webpack-merge')
const { clearConsole, printBanner } = require('@genma/scripts')

const openBrowser = require('../utils/openBrowser')
const commonConfig = require('../webpack/webpack.common')
const isInteractive = process.stdout.isTTY

const { webServerDefaultPort } = require('../config/ports')
const HOST = process.env.HOST || '0.0.0.0'

const config = merge(commonConfig, {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
})

const serverOptions = {
  compress: true,
  quiet: true,
  historyApiFallback: true,
  stats: {
    assets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false,
  },
  lazy: false,
  host: HOST,
  port: webServerDefaultPort,
  clientLogLevel: 'error',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, serverOptions)

server.listen(webServerDefaultPort, HOST, (err) => {
  if (err) {
    return console.log(err)
  }
  if (isInteractive) {
    clearConsole()
    printBanner()
  }
  console.log(chalk.cyan('Starting the development server...\n'))
  console.log(chalk.cyan(`http://localhost:${webServerDefaultPort}`))
  openBrowser(`http://localhost:${webServerDefaultPort}`)
})
