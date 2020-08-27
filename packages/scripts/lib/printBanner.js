const chalk = require('chalk')
const genmaASCII = require('./genma-ascii')
const log = console.log

module.exports = printBanner

function printBanner(version) {
  log(chalk.white(genmaASCII(version)))
  log(chalk.white(`================================================`))
  log(chalk.red('The best boilerplate for building Design Systems'))
  log(chalk.white(`================================================`))
  log()
}
