const fs = require("fs");
const _ = require("lodash");
const shell = require("shelljs");
const path = require("path");

module.exports = editPackage;

// TODO: remove app-root-path dependency

function editPackage() {
  const appDirectory = fs.realpathSync(process.cwd());
  const packageJson = require(path.join(appDirectory, "./package.json"));

  if (packageJson) {
    _.set(packageJson, "scripts.start", "genma-webpack start");
    _.set(packageJson, "scripts.build", "genma-webpack build");
  }

  fs.writeFile("package.json", JSON.stringify(packageJson, null, 2), (err) => {
    if (err) throw err;
    console.log("package.json updated!");
  });
}
