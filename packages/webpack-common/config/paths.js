const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const entryApp = resolveApp('src/index.js')
const outputApp = resolveApp('dist/js')
const htmlTemplateApp = resolveApp('src/doc/index.pug')
const htmlFileName = path.join(outputApp, 'index.html')
const postCssConfig = path.join(__dirname, './config')

module.exports = {
  entryApp,
  outputApp,
  htmlTemplateApp,
  htmlFileName,
  postCssConfig,
}
