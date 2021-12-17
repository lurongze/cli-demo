import chalk from 'chalk';

const handler = (name) => {
  console.log(chalk.blue('撀🍪🍵'), chalk.yellow(name));
};

const index = () => {};

export {
  handler,
  index,
};
