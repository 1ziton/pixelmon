import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { SiteConfig } from '../interfaces';
import { getPath } from '../utils/utils';
const mustache = require('mustache');
const klawSync = require('klaw-sync');

const rootDir = path.resolve(__dirname, '../../../');
const siteConfig = require(path.join(rootDir, 'src/site.config.js')) as SiteConfig;

function generate(rootPath, config) {
  const distPath = path.join(rootPath, config.dist);
  const srcPath = config.dir.src;
  const filePath = path.join(distPath, `materials.json`);
  fse.ensureDirSync(path.dirname(filePath));
  const files: { key: string; path: string }[] = [];
  // 获取每个区块/模板的package文件
  klawSync(srcPath, {
    nodir: false,
    filter: item => {
      if (config.dir.hasSubDir && item.stats.isDirectory()) return true;
      // console.log(`${path.sep},${item.path}`)
      return path.extname(item.path) === '.json' && item.stats.size > 1 && !item.path.includes(`${path.sep}demo${path.sep}`);
    },
  })
    .filter(item => path.extname(item.path) === '.json')
    .forEach(item => {
      const key = path.relative(srcPath, config.hasSubDir ? path.dirname(item.path) : getPath(item.path)).trim();
      if (key.length === 0) return;
      let sourceItem = files.find(w => w.key === key);
      if (!sourceItem) {
        sourceItem = {
          key,
          path: '',
        };
        files.push(sourceItem);
      }
      sourceItem.path = item.path;
    });

  // 组合物料信息
  const content: any = [];
  files.forEach(file => {
    const p = fse.readJsonSync(file.path);
    content.push({
      ...p.blockConfig,
      description: p.description,
      version: p.version,
      repositoryUrl: p.repository.url,
    });
  });
  let categories: string[] = [];
  content.map(c => {
    categories = [...new Set([...categories, ...c.categories])];
  });
  const tpl = fs.readFileSync(path.join(rootDir, config.dir.template.content)).toString('utf8');
  const result = mustache.render(tpl, { data: JSON.stringify(content), categories: JSON.stringify(categories) });
  fs.writeFileSync(filePath, result, { flag: 'w+' });
}

generate(rootDir, siteConfig.materials.blocks);
generate(rootDir, siteConfig.materials.scaffolds);
