import { Command, flags } from '@oclif/command'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chalk = require('chalk')
const { execFileSync } = require('child_process')
const inquirer = require('inquirer')
const rimraf = require('rimraf')
const { printBanner, clearConsole } = require('@genma/scripts')

const editPackage = require('../package.js')

const log = console.log

// Paths
const appDirectory = fs.realpathSync(process.cwd())
const srcDirectory = path.resolve(appDirectory, 'src')
const appPackageJson = path.resolve(appDirectory, 'package.json')
const templateDirectory = path.resolve(
  appDirectory,
  'node_modules/@genma/template/src'
)
const genmaPackage = require('../../package.json')

export default class Menu extends Command {
  static aliases = [''] // Default command

  static description = 'Open Genma interactive menu'

  static examples = [
    `
  $ genma menu
  OR
  $ genma menu --help
  `,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async run() {
    const { args, flags } = this.parse(Menu)

    printBanner(genmaPackage.version)
    this.showMenu()
  }

  showMenu() {
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
            await this.srcAlreadyExists()
          }

          // Check if package.json exists and create it
          if (!fs.existsSync(appPackageJson)) {
            log(chalk.cyan('Creating package.json...'))
            try {
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
            printBanner(genmaPackage.version)
            log(chalk.cyan('Installing dependencies...'))
            const dependencies = ['@genma/webpack-common', '@genma/template']
            execFileSync('npm', ['i'].concat(dependencies), { stdio: 'pipe' })
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
          printBanner(genmaPackage.version)
          log(chalk.bold.green('Congratulation!'))
          log(chalk.green('Genma is ready. Use `npm start`'))
        }
      })
      .catch(log)
  }

  srcAlreadyExists() {
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
}
