const fs = require('fs')
const config = require('./config')
const env = process.argv.splice(2)[0] || 'prod'; // 环境

console.log('脚本环境：↓↓↓↓ ')
console.log('evn= ' + env)

RegExp.escape = function (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

/**
 * uri:文件地址
 * type:如果是json，则适用json赋值的方式替换内容，其他则用正则匹配替换
 * noRegExpEscape:是否用RegExp.escape进行编码正则表达式
 * oldStr:需要替换的原字符，用作搜索 (支持数组)
 * newStr:替换的新字符 (支持数组，元素顺序对应oldStr)
 * desc:描述内容，只作为注释
 */
const configList = [
  {
    uri: './src/h5/pd/config.js',
    noRegExpEscape: true,
    oldStr: [
      "window.h5BaseUrl = '(.*)'",
    ],
    newStr: [
      `window.h5BaseUrl = '${config.H5BASEURL[env]}'`,
    ],
    desc: 'h5BaseUrl替换'
  },

]

for (let item of configList) {
  setTimeout(() => {
    changeFile(item);
  }, 300);
}

function changeFile(item) {
  // 同步修改文件
  let data = '';
  try {
    data = fs.readFileSync(item.uri, { encoding: 'utf-8' });
  } catch (e) {
    console.log('文件读取失败')
    console.log(e)
    return;
  }
  let newFile = '';
  if (data) {
    if (data.indexOf(item.newStr) !== -1 && data.indexOf(item.oldStr) === -1 && !item.noRegExpEscape && typeof oldStr === 'string') {
      console.log('【无需修改】' + item.uri)
      return;
    }
    if (item.type === 'json') {
      let dataObj = JSON.parse(data)
      dataObj[item.oldStr] = item.newStr
      newFile = JSON.stringify(dataObj)
    } else {
      newFile = replaceText(data, item)
    }
  }
  try {
    fs.writeFileSync(item.uri, newFile);
    console.log('Success: 修改' + item.uri + '的【' + item.desc + '】 成功！')
  } catch (e) {
    console.log('Error: 文件：' + item.uri + ' 修改失败！')
    return;
  }
}

/* 文本替换 */
function replaceText(data, item) {
  let newFile = data
  let repTypeIsString = typeof item.oldStr === 'string'
  if (item.noRegExpEscape) {
    if (repTypeIsString) {
      newFile = data.replace(new RegExp(item.oldStr, 'g'), item.newStr)
    } else {
      item.oldStr.forEach((str, index) => {
        newFile = newFile.replace(new RegExp(item.oldStr[index], 'g'), item.newStr[index])
      })
      // console.log(newFile)
    }
  } else {
    if (repTypeIsString) {
      newFile = data.replace(new RegExp(RegExp.escape(item.oldStr), 'g'), item.newStr)
    } else {
      item.oldStr.forEach((str, index) => {
        newFile = newFile.replace(new RegExp(RegExp.escape(item.oldStr[index]), 'g'), item.newStr[index])
      })
    }
  }
  return newFile
}
