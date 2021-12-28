import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

export function getSrcDir() {
  return path.join(path.dirname(filename), '../');
}

/**
 * node版本号判断
 * @param {*} needVersion 需要比较的版本号，如v12.0.0
 * @param {*} checkVersion 当前运行的版本号
 * @returns 比较结果，gt,lt,eq
 */
export function checkNodeVersion(needVersion = 'v12.0.0', checkVersion = process.version) {
  const checkParts = checkVersion.replace('v', '').split('.').map((s) => Number.parseInt(s, 10));
  const needParts = needVersion.replace('v', '').split('.').map((s) => Number.parseInt(s, 10));
  const len = checkParts.length;
  for (let i = 0; i < len; i += 1) {
    if (checkParts[i] > needParts[i]) {
      return 'gt';
    }
    if (checkParts[i] < needParts[i]) {
      return 'lt';
    }
  }
  return 'eq';
}
/**
 * 获取package.json文件的内容
 * @param {*} keyStr 内容的key值，层级的用.拼接，如'dependencies.chalk'可获取chalk的值
 * @returns 返回值，对象或字符串
 */
export function getPackageJsonData(keyStr = '') {
  try {
    const data = fse.readJsonSync(path.join(getSrcDir(), 'package.json'));
    console.log('package.json Path', path.join(getSrcDir(), 'package.json'));
    if (keyStr.length) {
      const keys = keyStr.split('.');
      let tmp = data;
      for (let i = 0; i < keys.length; i += 1) {
        tmp = tmp?.[keys[i]] || '';
        if (!tmp) {
          return '';
        }
      }
      return tmp;
    }
    return data;
  } catch (e) {
    console.error('获取package.json文件内容错误！', e);
    return {};
  }
}

export function isDir(pathStr) {
  const stat = fs.statSync(pathStr);

  return stat.isDirectory();
}
