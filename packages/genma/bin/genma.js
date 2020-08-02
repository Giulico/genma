#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')
const shell = require('shelljs')
const inquirer = require('inquirer')
const rimraf = require('rimraf')

const genmaASCII = require('../lib/genma-ascii.js')
const editPackage = require('../lib/package.js')

const log = console.log

log(chalk.white(genmaASCII))
log(chalk.white(`================================================`))
log(chalk.red('The best boilerplate for building Design Systems'))
log(chalk.white(`================================================`))
log()

installOrUpdate()

function installOrUpdate() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Menu:',
        name: 'start',
        choices: [
          {
            name: 'I want to install a fresh version of Genma on this folder',
            short: 'I want to install Genma',
            value: 'install',
          },
          {
            name: 'I want to upgrade Genma',
            short: 'I want to upgrade Genma',
            value: 'upgrade',
          },
        ],
      },
    ])
    .then(async (answers) => {
      if (answers['start'] === 'install') {
        // Install dependencies
        shell.exec('npm i @genma/webpack-common')
        // Edit package.json
        editPackage()
        // Copy the minimum tree of folder
        const ncp = require('ncp').ncp
        const appDirectory = fs.realpathSync(process.cwd())
        const srcDirectory = path.resolve(appDirectory, 'src')
        const templateDirectory = path.resolve(__dirname, '../template')

        if (fs.existsSync(srcDirectory)) {
          await srcAlreadyExists()
        }
        console.log('ora passo di qui')
        ncp(templateDirectory, appDirectory, (err) => {
          if (err) {
            return console.error(err)
          }
          console.log('Folder scaffolding created!')
        })
      }
    })
    .catch(console.log)
}

function srcAlreadyExists() {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: "The folder './src' already exists. Override it?",
        name: 'src-folder',
        choices: [
          {
            name:
              "Yes, remove './src' folder and start with a fresh copy of it",
            short: "Override './src' folder.",
            value: 'override',
          },
          {
            name: "No, wait! Exit Genma, I'll handle this by my self.",
            short: 'Exit Genma',
            value: 'exit',
          },
        ],
      },
    ])
    .then((answers) => {
      if (answers['src-folder'] === 'override') {
        const appDirectory = fs.realpathSync(process.cwd())
        const srcDirectory = path.resolve(appDirectory, 'src')
        // Delete src folder
        rimraf.sync(srcDirectory)
        console.log('Already existing folder removed')
      } else {
        // Quit cli
        process.exit(1)
      }
    })
    .catch(console.log)
}
