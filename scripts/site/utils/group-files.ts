import * as path from 'path';
import { SiteConfig, ModuleDirConfig } from '../interfaces';
const klawSync = require('klaw-sync');

export function groupFiles(
  srcPaths: string[],
  config: ModuleDirConfig,
  isSyncSpecific: boolean,
  target: string,
  siteConfig: SiteConfig,
) {
  const files: { key: string; data: { [key: string]: string } }[] = [];
  const langRe = new RegExp(`.(${siteConfig.langs.join('|')}){1}`, 'i');
  srcPaths.forEach(srcPath => {
    klawSync(srcPath, {
      nodir: false,
      filter: item => {
        if (config.hasSubDir && item.stats.isDirectory()) return true;
        return (
          path.extname(item.path) === '.md' && item.stats.size > 1 && !item.path.includes(`${path.sep}demo${path.sep}`)
        );
      },
    })
      .filter(item => path.extname(item.path) === '.md')
      .forEach(item => {

        const key = path.relative(srcPath, config.hasSubDir ? path.dirname(item.path) : getPath(item.path)).trim();
        // console.log(`item.path:${item.path}`)
        // console.log(`key:${key}`)
        if (key.length === 0) return;
        if (isSyncSpecific && key !== target) return;
        if (config.ignores && ~config.ignores.indexOf(key)) return;

        let sourceItem = files.find(w => w.key === key);
        if (!sourceItem) {
          sourceItem = {
            key,
            data: {},
          };
          files.push(sourceItem);
        }
        const langMatch = item.path.match(langRe);
        sourceItem.data[langMatch ? langMatch[1] : siteConfig.defaultLang] = item.path;
      });
  });
  return files;
}

/**
 * 解决电脑路径存在 .符号的用户名的情况
 * @param path  文件路径 
 */
function getPath(path) {
  let dotIdx = path.indexOf('.');
  let deskIdx = path.indexOf('Desktop');
  let path2 = '';
  let path3 = '';
  let resultPath = '';
  if (deskIdx !== -1) {
    path2 = path.substring(deskIdx);
    path3 = path.substring(0, deskIdx);
  }
 
  if (deskIdx > dotIdx) {
    resultPath = path3 + path2.split('.')[0];
  }
  return resultPath;
}