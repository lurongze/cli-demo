import chalk from 'chalk';
import logSymbols from 'log-symbols';
import { checkNodeVersion } from '../utils/index.js';

const handler = () => {
  console.log(chalk.yellowBright('node要求版本大于12.0.0'));
  if (checkNodeVersion() !== 'lt') {
    console.log('当前版本为:', chalk.green(process.version), logSymbols.success);
  } else {
    console.log('当前版本为:', chalk.red(process.version), logSymbols.error);
  }
};

export default handler;
