export interface Step {
  index: string;
  title: string;
  subTitle?: string;
  description?: string;
  pointColor?: string;
  contentColor?: string;
  contentBackground?: string;
  contentAlign?: 'left' | 'right';
  smartContentAlign?: 'left' | 'right';
  hiddenContent?: boolean;
}
