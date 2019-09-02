export interface QueryTab {
  title: string;
  field: string;
  showFilter?: boolean;
  searchValue?: any; // 搜索值
  defaultValue?: any; // 默认值
  displayValue?: any; // 展示值
  lexicon?: { value: any; label: string }[]; // 词典
}
