const fs = require("fs");
const _ = require("lodash");
const shell = require("shelljs");
const path = require("path");

module.exports = editPackage;

function editPackage() {
  const ret = shell.pwd();
  const appDir = path.dirname(require.main.filename);

  const packageJson = path.join(appDir, "./package.json");

  if (packageJson) {
    _.set(
      packageJson,
      "scripts.genma",
      "cross-env webpack --progress --hide-modules --config ./node_modules/@genma/webpack-common/webpack/webpack.prod.js"
    );
  }

  fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log("package.json updated!");
  });
}
