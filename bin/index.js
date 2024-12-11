#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { createProject } from '../lib/create-project.js';

const program = new Command();

console.log(chalk.blue.bold('Welcome to ReadyTemp - React Project Generator! 🚀'));
console.log(chalk.cyan('Created with ❤️ by ReadyTemp CLI\n'));

program
  .name('readytemp')
  .description('CLI to create production-ready React projects with custom templates')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new React project')
  .argument('<project-name>', 'Name of your project')
  .action(async (projectName) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Choose a project template:',
          choices: [
            { name: '🏗️ Empty Project (Basic Setup)', value: 'empty' },
            { name: '📝 Todo Application', value: 'todo' },
            { name: '📊 Admin Dashboard', value: 'dashboard' },
            { name: '🛍️ E-commerce Store', value: 'ecommerce' }
          ]
        },
        {
          type: 'list',
          name: 'language',
          message: 'Choose your preferred language:',
          choices: ['JavaScript', 'TypeScript']
        },
        {
          type: 'list',
          name: 'uiFramework',
          message: 'Choose a UI framework:',
          choices: [
            'Tailwind CSS',
            'Material UI',
            'Chakra UI'
          ]
        },
        {
          type: 'list',
          name: 'packageManager',
          message: 'Choose a package manager:',
          choices: ['npm', 'yarn', 'pnpm']
        }
      ]);

      console.log('\n🚀 Creating your React project with the following configuration:');
      console.log(chalk.cyan(`• Project Name: ${projectName}`));
      console.log(chalk.cyan(`• Template: ${answers.template}`));
      console.log(chalk.cyan(`• Language: ${answers.language}`));
      console.log(chalk.cyan(`• UI Framework: ${answers.uiFramework}`));
      console.log(chalk.cyan(`• Package Manager: ${answers.packageManager}`));
      console.log('');

      const spinner = ora('Setting up your project...').start();
      
      await createProject(projectName, {
        ...answers,
        git: true,
        installDeps: true
      });
      
      spinner.succeed(chalk.green('Project created successfully! 🎉'));
      
      console.log('\n📦 Project structure created with:');
      console.log(chalk.cyan('• Modern folder structure'));
      console.log(chalk.cyan('• Selected template setup'));
      console.log(chalk.cyan('• Routing setup'));
      console.log(chalk.cyan('• Component templates'));
      console.log(chalk.cyan('• UI framework configuration'));
      
      console.log('\n🚀 To get started:');
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan(`  ${answers.packageManager} start`));
      
      console.log('\n📘 Check out README.md for more information about the project structure.');
      console.log(chalk.gray('\nHappy coding! 🎉'));
      
    } catch (error) {
      console.error(chalk.red('Error creating project:', error));
      process.exit(1);
    }
  });

program.parse(); 