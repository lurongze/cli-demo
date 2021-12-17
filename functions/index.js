import inquirer from 'inquirer';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import downloadGit from 'download-git-repo';
import gulp from 'gulp';
import gulpReplace from 'gulp-replace';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

function getProjectDir(dirStr) {
  return path.normalize(path.join(process.cwd(), dirStr));
}

function isDir(dirStr) {
  try {
    const stat = fs.statSync(dirStr);
    return stat.isDirectory();
  } catch (e) {
    console.log('xx');
    return false;
  }
}

const questions = [
  {
    type: 'input',
    name: 'projectDir',
    message: '项目目录',
    validate(value) {
      const valid = /^[a-zA-Z0-9_]{1,}$/.test(value);
      if (valid) {
        return !isDir(getProjectDir(value)) || '目录已存在，请重新输入';
      }
      return '只能输入字母数字和下划线';
    },
  },
  {
    type: 'rawlist',
    name: 'gitURL',
    message: '选择你要下载的项目',
    choices: [
      {
        name: 'Git学习项目',
        value: 'https://github.com/lurongze/gitlearn.git',
      },
      {
        name: '前端3D学习',
        value: 'https://github.com/lurongze/threed-learn.git',
      },
    ],
  },
];
const spinner = ora('项目下载中...');

inquirer.prompt(questions).then((answers) => {
  const link = answers.gitURL;
  if (link) {
    console.log(logSymbols.info, '开始下载项目');
    spinner.start();
    const projectDir = getProjectDir(answers.projectDir);
    downloadGit(`direct:${link}`, projectDir, { clone: true }, (err) => {
      spinner.stop();
      if (err) {
        console.log(logSymbols.error, '下载项目失败：', err);
      } else {
        console.log(logSymbols.success, '下载项目成功！');
        console.time();
        gulp.src(`${projectDir}${path.sep}**.md`).pipe(gulpReplace('密码', '密密麻麻')).pipe(gulp.dest(projectDir));
        console.timeEnd();
        console.log(logSymbols.success, '项目参数初始化成功！');
        console.log(logSymbols.info, chalk.yellow(`cd ${answers.projectDir} 
          npm install
        `));
      }
    });
  }
});
