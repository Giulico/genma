const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const entryApp = resolveApp('src/js/index.js')
const outputApp = resolveApp('dist/js')

module.exports = {
  entryApp,
  outputApp,
}
