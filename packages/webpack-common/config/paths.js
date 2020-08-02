const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const entryApp = resolveApp('src/js/index.js')
const outputApp = resolveApp('dist/js')
const htmlTemplateApp = resolveApp('src/doc/index.html')

module.exports = {
  entryApp,
  outputApp,
  htmlTemplateApp,
}
