import chalk from 'chalk';
import { getSrcDir } from '../utils/index.js';

const handler = (name, options) => {
  console.log(chalk.blue('撀🍪🍵'), chalk.yellow(name));
};

export default handler;
