const fs = require("fs");
const _ = require("lodash");
const shell = require("shelljs");

module.exports = editPackage;

function editPackage() {
  const ret = shell.pwd();
  const packageJson = require("../package.json");

  if (packageJson) {
    _.set(packageJson, "scripts.genma", "webpack genma-webpack-config.js");
  }

  fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log("package.json updated!");
  });
}
