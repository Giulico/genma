#!/usr/bin/env node

const fs = require("fs");
const _ = require("lodash");
const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");

const genmaASCII = require("../lib/genma-ascii.js");
const editPackage = require("../lib/package.js");

const log = console.log;

log(chalk.white(genmaASCII));
log(chalk.white(`================================================`));
log(chalk.red("The best boilerplate for building Design Systems"));
log(chalk.white(`================================================`));
log();

inquirer
  .prompt([
    {
      type: "list",
      message: "Menu:",
      name: "start",
      choices: [
        {
          name: "I want to install a fresh version of Genma on this folder",
          short: "I want to install Genma",
          value: "install",
        },
        {
          name: "I want to upgrade Genma",
          short: "I want to upgrade Genma",
          value: "upgrade",
        },
      ],
    },
  ])
  .then((answers) => {
    if (answers === "install") {
      shell.exec("npm i @giulico/scripts");
      editPackage();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
