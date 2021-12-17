#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { handler } from '../functions/create.js';

const program = new Command();

// program
//   .version('0.0.0.1')
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');

// console.log('process.argv', process.argv);
// program.parse(process.argv);

// const options = program.opts();
// if (options.debug) {
//   console.log(options);
// }
// console.log('pizza details:');
// if (options.small) {
//   console.log('- small pizza size');
// }
// if (options.pizzaType) {
//   console.log(`- ${options.pizzaType}`);
// }
program.version('0.0.1.1', '-v,--version,-V', '获取版本号');

program.command('c [name]').description('新建项目').option('--recover', '强制覆盖同名目录').action((name, options) => {
  console.log('创建的项目为：', chalk.blue(name), options);
  handler(name);
});

program.parse(process.argv);
if (process.argv.length < 3) {
  program.help();
}
