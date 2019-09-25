import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { SiteConfig } from '../interfaces';
import { getPath } from '../utils/utils';
const mustache = require('mustache');
const klawSync = require('klaw-sync');

const rootDir = path.resolve(__dirname, '../../../');
const siteConfig = require(path.join(rootDir, 'src/site.config.js')) as SiteConfig;

// MATERIALS_COMPONENT_CONFIG.ts
let relationFileStr = `
// this file is auto generate
`;
let arrStr = `
export const MATERIALS_COMPONENT_CONFIG = [`;

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
      const idx = key.indexOf('/package');
      const mKey = srcPath.substring(2) + '/' + key.substring(0, idx);
      if (!sourceItem) {
        sourceItem = {
          key: mKey,
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
    relationFileStr += generateImport(file.key, p.blockConfig);
    arrStr += generateRelateItem(p.blockConfig);

    content.push({
      ...p.blockConfig,
      description: p.description,
      version: p.version,
      repositoryUrl: p.repository.url,
    });
  });

  let categories: string[] = [];
  content.map(c => {
    categories = categories.concat(c.categories);
  });
  const set = new Set(categories);
  const tpl = fs.readFileSync(path.join(rootDir, config.dir.template.content)).toString('utf8');
  const result = mustache.render(tpl, { data: JSON.stringify(content), categories: JSON.stringify(Array.from(set)) });
  fs.writeFileSync(filePath, result, { flag: 'w+' });
}

/**
 * 因aot编译会压缩和重命名变量和组件类名等（应该有配置可以解决这个问题，没找到）。
 * 生成selector和组件名的关系文件，用于动态渲染查找到对应组件类使用
 */
function generateImport(key: string, blockConfig: any) {
  return `import { ${blockConfig.entryClassName} } from "@${key}";
  `;
}

function generateRelateItem(blockConfig: any) {
  return `{
    selector: '${blockConfig.name}',
    component: ${blockConfig.entryClassName}
  },`;
}

function main() {
  generate(rootDir, siteConfig.materials.blocks);
  generate(rootDir, siteConfig.materials.scaffolds);
  arrStr += '];';
  fs.writeFileSync(path.join('./src/app/routes/materials', 'MATERIALS_COMPONENT_CONFIG.ts'), relationFileStr + arrStr, { flag: 'w+' });
}

main();
