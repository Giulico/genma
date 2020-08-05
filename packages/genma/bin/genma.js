#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')
const { execFileSync } = require('child_process')
const inquirer = require('inquirer')
const rimraf = require('rimraf')
const { printBanner, clearConsole } = require('@genma/scripts')

const genmaASCII = require('../lib/genma-ascii.js')
const editPackage = require('../lib/package.js')

const log = console.log

// Paths
const appDirectory = fs.realpathSync(process.cwd())
const srcDirectory = path.resolve(appDirectory, 'src')
const appPackageJson = path.resolve(appDirectory, 'package.json')
const templateDirectory = path.resolve(
  appDirectory,
  'node_modules/@genma/template/src'
)

printBanner()

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
        // Check if ./src folder already exists and delete it
        if (fs.existsSync(srcDirectory)) {
          await srcAlreadyExists()
        }

        // Check if package.json exists and create it
        if (!fs.existsSync(appPackageJson)) {
          log(chalk.cyan('Creating package.json...'))
          try {
            execFileSync('pwd')
            execFileSync('npm', ['init'], { stdio: 'inherit' })
          } catch (e) {
            log(chalk.red('Genma fails to initialize project.'))
            console.log(e.stderr)
            process.exit(0)
          }
        }

        // Install dependencies
        try {
          clearConsole()
          printBanner()
          log(chalk.cyan('Installing dependencies...'))
          const dependencies = ['@genma/webpack-common', '@genma/template']
          execFileSync('npm', ['i', ...dependencies], { stdio: 'pipe' })
        } catch (e) {
          log(chalk.red('Genma fails to intall the dependencies.'))
          log(
            chalk.red(
              'The installation process will continue. Please use `npm i` at the end of the process.'
            )
          )
          console.log(e.stderr)
        }

        // Update package.json
        editPackage()

        // Copy the minimum tree of folder
        const ncp = require('ncp').ncp

        ncp(templateDirectory, appDirectory, (err) => {
          if (err) {
            return console.error(err)
          }
        })

        // Congratulation message
        clearConsole()
        printBanner()
        log(chalk.bold.green('Congratulation!'))
        log(chalk.green('Genma is ready. Use `npm start`'))
      }
    })
    .catch(log)
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
        // Delete src folder
        rimraf.sync(srcDirectory)
      } else {
        // Quit cli
        process.exit(1)
      }
    })
    .catch(console.log)
}
