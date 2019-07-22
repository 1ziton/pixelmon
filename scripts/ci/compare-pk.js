'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
// const execSync = require('child_process').execSync;
const npmPackageName = process.env.npm_package_name;
const uri = './.gitlab-ci.yml';

const uuid = () => {
  return `${Math.random()
    .toString(36)
    .substr(2)}`;
};

// 监听package.json 文件版本更新，然后脚本自动修改NODE_MODULES_VERSION版本号
exec('git diff --cached --name-only package.json', function(error, stdout, stderr) {
  const regexStr = `NODE_MODULES_VERSION: '${npmPackageName}-(.*?)'`;
  const regex = new RegExp(regexStr, 'g');
  let newData = '';
  if (error) {
    console.error('error: ' + error);
    return;
  }
  console.log('git diff stdout: ', stdout);
  if (!stdout) {
    return console.log('package.json 无修改');
  }
  try {
    let oldData = fs.readFileSync(uri, { encoding: 'utf-8' });
    newData = oldData.replace(regex, `NODE_MODULES_VERSION: '${npmPackageName}-${new Date().getTime()}'`);
  } catch (error) {
    console.log('Error: 读取失败！');
    return;
  }
  try {
    fs.writeFileSync(uri, newData);
    exec('git add .gitlab-ci.yml', function(error, stdout, stderr) {
      if (error) {
        console.error('git add error: ' + error);
        return;
      }
      console.log(`git add ${uri} success`);
    });
    console.log(`Success: ${uri}文件修改成功！`);
  } catch (e) {
    console.log('Error: 文件：修改失败！');
    return;
  }
});
