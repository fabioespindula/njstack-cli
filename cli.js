#!/usr/bin/env node
import chalk from 'chalk';
import gradient from 'gradient-string';
import prompts from 'prompts';
import { execa } from 'execa';

console.clear();

const njstackArt = `


░█▀█░█▀▀░█░█░▀█▀░▀▀█░█▀▀░░░█▀▀░▀█▀░█▀█░█▀▀░█░█            
░█░█░█▀▀░▄▀▄░░█░░░░█░▀▀█░░░▀▀█░░█░░█▀█░█░░░█▀▄            
░▀░▀░▀▀▀░▀░▀░░▀░░▀▀░░▀▀▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀░▀            
░█▀▀░█▀█░█▀▄░▀█▀░█▀█░░░█▀▀░█▀▀░█▀█░▀█▀░█▀█░█▀▄░█░█░█░░░█▀█
░█▀▀░█▀█░█▀▄░░█░░█░█░░░█▀▀░▀▀█░█▀▀░░█░░█░█░█░█░█░█░█░░░█▀█
░▀░░░▀░▀░▀▀░░▀▀▀░▀▀▀░░░▀▀▀░▀▀▀░▀░░░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀░▀

`;

console.log(gradient.mind(njstackArt));

(async () => {
  const responses = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: chalk.cyan('What will your project be called?')
    },
    {
      type: 'select',
      name: 'packageManager',
      message: chalk.cyan('Which package manager do you want to use?'),
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' }
      ],
      initial: 0
    }
  ]);

  const { projectName, packageManager } = responses;

  console.log(chalk.green(`\n🚀 Cloning NJSTACK boilerplate into "${projectName}"...`));
  await execa('npx', ['degit', 'fabioespindula/nextjs', projectName]);

  console.log(chalk.green('\n📦 Installing dependencies...'));
  process.chdir(projectName);
  await execa(packageManager, ['install']);

  const runCommand = packageManager === 'npm' ? 'run dev' : 'dev';

  console.log(chalk.green('\n✅ All set! Run:'));
  console.log(chalk.yellow(`\ncd ${projectName} && ${packageManager} ${runCommand}\n`));
})();
