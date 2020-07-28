#!/usr/bin/env node

const chalk = require("chalk");
const shell = require("shelljs");
const inquirer = require("inquirer");

const panda = require("../lib/panda.js");

const log = console.log;

log(chalk.white(panda));
log(chalk.white(`===========================================================`));
log(chalk.red("                   Welcome to GENMA!!"));
log(chalk.white(`===========================================================`));

inquirer
  .prompt([
    {
      type: "list",
      message: "Sei pronto ad iniziare??",
      name: "start",
      choices: [
        new inquirer.Separator(" ~O~ "),
        {
          name: "Sono pronto",
        },
        {
          name: "No, no, aspetta!",
        },
      ],
    },
  ])
  .then((answers) => {
    log("hai risposto", answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

shell.exec("npm i @giulico/scripts && node ../lib/package.js");
