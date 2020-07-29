const fs = require("fs");
const _ = require("lodash");
const shell = require("shelljs");
const path = require("path");

module.exports = editPackage;

function editPackage() {
  const ret = shell.pwd();
  var appRoot = require("app-root-path");

  const packageJson = require(path.join(appRoot.path, "./package.json"));

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

editPackage();
