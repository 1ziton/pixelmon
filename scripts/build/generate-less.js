const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

let root = path.resolve(__dirname, `../..`);
function copyLess(name) {
  let sourcePath = path.join(root, `packages/${name}`);
  let targetPath = path.join(root, `dist/@pixelmon/${name}`);
  // index.less
  const spath = `${sourcePath}/index.less`;
  // console.log(spath);
  // console.log(targetPath);
  fse.copySync(spath, `${targetPath}/index.less`);
  // modules less
  fs.readdirSync(targetPath).forEach(name => {
    if (fs.existsSync(`${sourcePath}/${name}/style/index.less`)) {
      fse.copySync(`${sourcePath}/${name}/style`, `${targetPath}/${name}/style`);
    }
  });
}

['pikachu', 'ggeditor/src/editor/styles', 'chart'].forEach(name => copyLess(name));
console.log('pikachu style copy finish');
// copy theme
fse.copySync(path.join(root, `packages/theme/styles`), path.join(root, `dist/@pixelmon/theme/styles`));
