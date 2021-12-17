### 开发cli工具流程

#### 初始化项目
新建开发目录，进入目录后使用npm初始化项目，填写项目基本信息。
```shell
mkdir my-cli
cd my-cli
npm init
```
打开package.json文件，加入`bin`参数

```json
{
  "name": "my-cli", // 项目名称
  "version": "1.0.0",
  "description": "my-cli",
  "type":"module",  // 为了支持node里使用import
  "main": "index.js",
  "bin": { // 最重要字段，有这个，终端才可以执行我们的命令
    "my-cli": "./bin/index.js" // my-cli表示我们的cli程序名称，路径是我们的执行代码文件
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

### 新建代码文件
一般我们新建一个`bin`目录，里面`index.js`是我们的执行代码文件。（可以随便建，和package.json里bin定义的一样即可）
```js
// ./bin/index.js
#!/usr/bin/env node
console.log("cli-demo");
```
注意，第一行代码`#!/usr/bin/env node`非常重要，定义了代码执行程序为node，不然可能会以文本形式打开文件。

### 本地安装
在项目跟目录，执行`npm install -g`，即可把本地开发的cli项目全局安装到本地，方便测试。

### 开发cli常用辅助包

- commander
[https://github.com/tj/commander.js] 
一个用来做命令号工具的三方包，可以帮你简化对用户参数的输入与处理。

- inquirer
[https://github.com/SBoudrias/Inquirer.js] 
一个用来做交互式问答的库。场景例如，vue-cli或者createReactApp脚手架中，问你选哪个模板，是否用typescript等。

- chalk
[https://github.com/chalk/chalk] 
粉笔，美化工具，可以为你在命令行中输出的内容，增色添彩。

- log-symbols
[https://github.com/sindresorhus/log-symbols] 
打印信息的图标，包括error，success，info，warning

- ora
[https://github.com/sindresorhus/ora] 
Loading库，主要用于远程拉取文件时候，给用户一个loading提示。

- Semver
[https://github.com/semver/semver] 
一个用来做命令号工具的三方包，可以帮你简化对用户参数的输入与处理。

- download-git-repo
[https://gitlab.com/flippidippi/download-git-repo#readme] 
用于从GitHub, GitLab, Bitbucket 下载一个git仓库。

- minimist
[https://github.com/substack/minimist] 
解析命令行参数

- execa
[https://github.com/sindresorhus/execa]
是可以调用 shell 和本地外部程序的 javascript 封装，在 Node.js 内置的 child_process.exec 基础上进行了提升，比如更好地支持 windows 平台，以及提供Promise的接口等等。


