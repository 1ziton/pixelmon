/* tslint:disable */

import React from 'react';
import { Card } from 'antd';
import { NodePanel, EdgePanel, GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'gg-editor';
import DetailForm from './DetailForm';
// import styles from '../../styles/index.less';

const FlowDetailPanel = () => {
  return React.createElement(DetailPanel, { className: 'detail-panel', key: 'detail-panel' }, [
    React.createElement(NodePanel, { key: 'node' }, React.createElement(DetailForm as any, { type: 'node' })),
    React.createElement(EdgePanel, { key: 'edge' }, React.createElement(DetailForm as any, { type: 'edge' })),
    React.createElement(GroupPanel, { key: 'group' }, React.createElement(DetailForm as any, { type: 'group' })),
    React.createElement(MultiPanel, { key: 'multiinner' }, React.createElement(Card, { type: 'inner' })),
    React.createElement(CanvasPanel, { key: 'canvasinner' }, React.createElement(Card, { type: 'inner' })),
  ]);

  //   return (
  //     <DetailPanel className={styles.detailPanel}>
  //       <NodePanel>
  //         <DetailForm type="node" />
  //       </NodePanel>
  //       <EdgePanel>
  //         <DetailForm type="edge" />
  //       </EdgePanel>
  //       <GroupPanel>
  //         <DetailForm type="group" />
  //       </GroupPanel>
  //       <MultiPanel>
  //         <Card type="inner" size="small" title="Multi Select" bordered={false} />
  //       </MultiPanel>
  //       <CanvasPanel>
  //         <Card type="inner" size="small" title="Canvas" bordered={false} />
  //       </CanvasPanel>
  //     </DetailPanel>
  //   );
};

export default FlowDetailPanel;
