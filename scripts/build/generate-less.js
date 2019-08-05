const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

let root = path.resolve(__dirname, `../..`);
function copyLess(name) {
  let sourcePath = path.join(root, `packages/${name}`);
  let targetPath = path.join(root, `dist/@pokemon/${name}`);
  // index.less
  const spath = `${sourcePath}/index.less`;
  console.log(spath);
  console.log(targetPath);
  fse.copySync(spath, `${targetPath}/index.less`);
  // modules less
  fs.readdirSync(targetPath).forEach(name => {
    if (fs.existsSync(`${sourcePath}/${name}/style/index.less`)) {
      fse.copySync(`${sourcePath}/${name}/style`, `${targetPath}/${name}/style`);
    }
  });
}

['pikachu'].forEach(name => copyLess(name));
console.log('pikachu style copy finish');
// copy theme
fse.copySync(path.join(root, `packages/theme/styles`), path.join(root, `dist/@pokemon/theme/styles`));
