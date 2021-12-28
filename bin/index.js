#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { createHandler, checkEnvHandler } from '../handlers/index.js';
import { getPackageJsonData } from '../utils/index.js';

const program = new Command();

program.version(chalk.green(getPackageJsonData('version')), '-v,--version,-V', '获取版本号');

program.command('check env').description('检测基础环境').action((name, options) => {
  console.log('创建的项目为：', chalk.blue(name), options);
  checkEnvHandler(name);
});

program.command('c <name>')
  .description('新建项目')
  .option('--recover', '强制覆盖同名目录', false)
  .action((name, options) => {
    createHandler(name, options);
  });

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
