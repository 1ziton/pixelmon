import { ArticlesListPageComponent } from './blocks/articles-list';
import { StatisticCardBlockComponent } from './blocks/statistic-card';
import { SaleAnalysisCardBlockComponent } from './blocks/sale-analysis-card';
import { XzgLoginPageComponent } from './scaffolds/xzg-login';
import { FmlLoginPageComponent } from './scaffolds/fml-login';

/**
 * 区块blocks组件
 */
const BLOCKS_COMPONENTS = [ArticlesListPageComponent, StatisticCardBlockComponent, SaleAnalysisCardBlockComponent];

/**
 * 模板scaffolds组件
 */
const SCOFFOLDS_COMPONENTS = [XzgLoginPageComponent, FmlLoginPageComponent];

export const MATERIALS_ENTY_COMPONENTS = [...BLOCKS_COMPONENTS, ...SCOFFOLDS_COMPONENTS];
